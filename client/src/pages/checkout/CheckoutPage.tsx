import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../../features/cart/model/cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { createOrder } from "../../shared/api/orders-api";

type FieldName = "customerName" | "address" | "email";
type FieldErrors = Partial<Record<FieldName, string>>;

function getFieldErrors({
    customerName,
    address,
    email,
}: Record<FieldName, string>): FieldErrors {
    const errors: FieldErrors = {};

    if (!/\p{L}/u.test(customerName.trim())) {
        errors.customerName = "Full name must contain at least one letter.";
    }

    if (!/\p{L}/u.test(address.trim())) {
        errors.address = "Address must contain at least one letter.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        errors.email = "Enter a valid email address.";
    }

    return errors;
}

export function CheckoutPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const cartItems = useAppSelector((state) => state.cart.items);

    const [customerName, setCustomerName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [touchedFields, setTouchedFields] = useState<
        Partial<Record<FieldName, boolean>>
    >({});

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const fieldErrors = getFieldErrors({ customerName, address, email });
    const isFormValid = Object.keys(fieldErrors).length === 0;

    function markFieldAsTouched(fieldName: FieldName) {
        setTouchedFields((fields) => ({ ...fields, [fieldName]: true }));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!isFormValid) {
            setTouchedFields({
                customerName: true,
                address: true,
                email: true,
            });
            return;
        }

        if (cartItems.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        try {
            setError("");
            setIsSubmitting(true);

            await createOrder({
                customerName: customerName.trim(),
                address: address.trim(),
                email: email.trim(),
                items: cartItems.map((item) => ({
                    productId: item.id,
                    name: item.name,
                    categoryId: item.categoryId,
                    categoryName: item.categoryName,
                    price: item.price,
                    quantity: item.quantity,
                })),
            });

            dispatch(clearCart());
            navigate("/orders");
        } catch {
            setError("Unable to create the order. Check that Orders API is running.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (cartItems.length === 0) {
        return (
            <main className="mx-auto max-w-2xl p-6">
                <h1 className="mb-4 text-3xl font-bold">Order summary</h1>
                <p className="mb-4">Your cart is empty.</p>

                <Link
                    to="/"
                    className="rounded bg-sky-600 px-4 py-2 font-medium text-white"
                >
                    Go to catalog
                </Link>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-2xl p-6">
            <h1 className="mb-6 text-3xl font-bold">Order summary</h1>

            <section className="mb-6 rounded-lg bg-white p-5 shadow">
                <h2 className="mb-4 text-xl font-semibold">Selected products</h2>

                <div className="space-y-3">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between border-b border-slate-200 pb-3"
                        >
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-slate-600">
                                    {item.categoryName} · Quantity: {item.quantity}
                                </p>
                            </div>

                            <p className="font-semibold">
                                ${(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>

                <p className="mt-4 text-right text-xl font-bold">
                    Total: ${totalPrice.toFixed(2)}
                </p>
            </section>

            <form
                onSubmit={(event) => void handleSubmit(event)}
                noValidate
                className="space-y-4 rounded-lg bg-white p-5 shadow"
            >
                <h2 className="text-xl font-semibold">Customer details</h2>

                {error && (
                    <p className="rounded bg-red-100 p-3 text-red-700">{error}</p>
                )}

                <label className="block">
                    <span className="mb-1 block font-medium">Full name</span>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(event) => setCustomerName(event.target.value)}
                        onBlur={() => markFieldAsTouched("customerName")}
                        aria-invalid={Boolean(
                            touchedFields.customerName && fieldErrors.customerName
                        )}
                        aria-describedby={
                            touchedFields.customerName && fieldErrors.customerName
                                ? "customer-name-error"
                                : undefined
                        }
                        className={`w-full rounded border p-2 ${
                            touchedFields.customerName && fieldErrors.customerName
                                ? "border-red-500"
                                : "border-slate-300"
                        }`}
                    />
                    {touchedFields.customerName && fieldErrors.customerName && (
                        <p id="customer-name-error" className="mt-1 text-sm text-red-700">
                            {fieldErrors.customerName}
                        </p>
                    )}
                </label>

                <label className="block">
                    <span className="mb-1 block font-medium">Full address</span>
                    <input
                        type="text"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        onBlur={() => markFieldAsTouched("address")}
                        aria-invalid={Boolean(
                            touchedFields.address && fieldErrors.address
                        )}
                        aria-describedby={
                            touchedFields.address && fieldErrors.address
                                ? "address-error"
                                : undefined
                        }
                        className={`w-full rounded border p-2 ${
                            touchedFields.address && fieldErrors.address
                                ? "border-red-500"
                                : "border-slate-300"
                        }`}
                    />
                    {touchedFields.address && fieldErrors.address && (
                        <p id="address-error" className="mt-1 text-sm text-red-700">
                            {fieldErrors.address}
                        </p>
                    )}
                </label>

                <label className="block">
                    <span className="mb-1 block font-medium">Email</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        onBlur={() => markFieldAsTouched("email")}
                        aria-invalid={Boolean(touchedFields.email && fieldErrors.email)}
                        aria-describedby={
                            touchedFields.email && fieldErrors.email
                                ? "email-error"
                                : undefined
                        }
                        className={`w-full rounded border p-2 ${
                            touchedFields.email && fieldErrors.email
                                ? "border-red-500"
                                : "border-slate-300"
                        }`}
                    />
                    {touchedFields.email && fieldErrors.email && (
                        <p id="email-error" className="mt-1 text-sm text-red-700">
                            {fieldErrors.email}
                        </p>
                    )}
                </label>

                <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className="w-full rounded bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700 disabled:bg-slate-400"
                >
                    {isSubmitting ? "Creating order..." : "Confirm order"}
                </button>
            </form>
        </main>
    );
}