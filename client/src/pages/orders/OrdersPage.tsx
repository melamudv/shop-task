import { useEffect, useState } from "react";
import type { Order } from "../../entities/order/model";
import { getOrders } from "../../shared/api/orders-api";

const purchaseDateFormatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
});

export function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isCurrent = true;

        async function loadOrders() {
            try {
                const loadedOrders = await getOrders();

                if (isCurrent) {
                    setOrders(loadedOrders);
                }
            } catch {
                if (isCurrent) {
                    setError("Unable to load orders. Check that Orders API is running.");
                }
            } finally {
                if (isCurrent) {
                    setIsLoading(false);
                }
            }
        }

        void loadOrders();

        return () => {
            isCurrent = false;
        };
    }, []);

    if (isLoading) {
        return (
            <main
                className="flex min-h-screen items-center justify-center"
                aria-label="Loading orders"
                role="status"
            >
                <svg
                    className="size-12 animate-spin text-sky-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="3"
                    />
                    <path
                        className="opacity-90"
                        d="M21 12a9 9 0 0 0-9-9"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="3"
                    />
                </svg>
                <span className="sr-only">Loading orders</span>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-2xl p-6">
            <h1 className="mb-6 text-3xl font-bold">Orders</h1>

            {error && (
                <p className="rounded bg-red-100 p-3 text-red-700">{error}</p>
            )}

            {!error && orders.length === 0 && (
                <p className="rounded-lg bg-white p-5 shadow">No orders yet.</p>
            )}

            <div className="space-y-4">
                {orders.map((order) => (
                    <article key={order._id} className="rounded-lg bg-white p-5 shadow">
                        <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                            <div>
                                <h2 className="font-semibold">{order.customerName}</h2>
                                <p className="text-sm text-slate-600">{order.email}</p>
                            </div>
                            <time
                                className="text-sm text-slate-600"
                                dateTime={order.createdAt}
                            >
                                {purchaseDateFormatter.format(new Date(order.createdAt))}
                            </time>
                        </div>

                        <ul className="space-y-2">
                            {order.items.map((item) => (
                                <li key={item.productId} className="flex justify-between">
                                    <span>{item.name}</span>
                                    <span className="font-medium">Quantity: {item.quantity}</span>
                                </li>
                            ))}
                        </ul>

                        <p className="mt-4 border-t border-slate-200 pt-3 text-right font-bold">
                            Total: ${order.totalPrice.toFixed(2)}
                        </p>
                    </article>
                ))}
            </div>
        </main>
    );
}
