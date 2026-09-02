import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../features/cart/model/cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import type { Category } from "../../entities/category/model";
import type { Product } from "../../entities/product/model";
import {
    getCategories,
    getProductsByCategory,
} from "../../shared/api/catalog-api";

export function CatalogPage() {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);

    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        null
    );
    const [selectedProductId, setSelectedProductId] = useState<number | null>(
        null
    );
    const [quantity, setQuantity] = useState(1);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [error, setError] = useState("");

    const selectedCategory = categories.find(
        (category) => category.id === selectedCategoryId
    );

    const selectedProduct = products.find(
        (product) => product.id === selectedProductId
    );
    const cartItemsByCategory = cartItems.reduce((groups, item) => {
        const categoryItems = groups.get(item.categoryName) ?? [];
        categoryItems.push(item);
        groups.set(item.categoryName, categoryItems);

        return groups;
    }, new Map<string, typeof cartItems>());

    useEffect(() => {
        async function loadCatalog() {
            try {
                setError("");

                // 1. Get all categories when the page loads.
                const loadedCategories = await getCategories();
                setCategories(loadedCategories);

                if (loadedCategories.length === 0) {
                    return;
                }

                // 2. Load products for the first visible category.
                const firstCategory = loadedCategories[0];
                setSelectedCategoryId(firstCategory.id);
                setIsLoadingProducts(true);

                const loadedProducts = await getProductsByCategory(firstCategory.id);
                setProducts(loadedProducts);
                setSelectedProductId(loadedProducts[0]?.id ?? null);
            } catch {
                setError("לא ניתן לטעון את הקטלוג. ודא ששירות הקטלוג פעיל.");
            } finally {
                setIsLoadingCategories(false);
                setIsLoadingProducts(false);
            }
        }

        void loadCatalog();
    }, []);

    async function handleCategoryChange(categoryId: number) {
        try {
            setError("");
            setSelectedCategoryId(categoryId);
            setProducts([]);
            setSelectedProductId(null);
            setQuantity(1);
            setIsLoadingProducts(true);

            const loadedProducts = await getProductsByCategory(categoryId);
            setProducts(loadedProducts);
            setSelectedProductId(loadedProducts[0]?.id ?? null);
        } catch {
        setError("לא ניתן לטעון מוצרים עבור קטגוריה זו.");
        } finally {
            setIsLoadingProducts(false);
        }
    }

    function handleAddToCart() {
        if (!selectedCategory || !selectedProduct || quantity < 1) {
            return;
        }

        for (let index = 0; index < quantity; index += 1) {
            dispatch(
                addToCart({
                    product: selectedProduct,
                    categoryName: selectedCategory.name,
                })
            );
        }
    }

    if (isLoadingCategories) {
        return (
            <main
                className="flex min-h-screen items-center justify-center"
                aria-label="טעינת קטלוג"
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
                <span className="sr-only">טוען קטלוג</span>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-2xl p-6">
            <h1 className="mb-6 text-3xl font-bold">קטלוג</h1>

            {error && (
                <p className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</p>
            )}

            <div className="space-y-5 rounded-lg bg-white p-6 shadow">
                <label className="block">
                    <span className="mb-1 block font-medium">קטגוריה</span>
                    <select
                        value={selectedCategoryId ?? ""}
                        onChange={(event) => void handleCategoryChange(Number(event.target.value))}
                        className="w-full rounded border border-slate-300 p-2"
                        disabled={categories.length === 0}
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="block">
                    <span className="mb-1 block font-medium">מוצר</span>
                    <select
                        value={selectedProductId ?? ""}
                        onChange={(event) => setSelectedProductId(Number(event.target.value))}
                        className="w-full rounded border border-slate-300 p-2"
                        disabled={isLoadingProducts || products.length === 0}
                    >
                        {products.length === 0 ? (
                            <option value="">אין מוצרים זמינים</option>
                        ) : (
                            products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name} - ₪{product.price.toFixed(2)}
                                </option>
                            ))
                        )}
                    </select>
                </label>

                <label className="block">
                    <span className="mb-1 block font-medium">כמות</span>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(event) =>
                            setQuantity(Math.max(1, Number(event.target.value) || 1))
                        }
                        className="w-full rounded border border-slate-300 p-2"
                    />
                </label>

                {selectedProduct && (
                    <div className="rounded bg-slate-100 p-4">
                        <p className="font-semibold">{selectedProduct.name}</p>
                        <p>₪{selectedProduct.price.toFixed(2)} ליחידה</p>
                        <p className="font-bold">
                            סה"כ: ₪{(selectedProduct.price * quantity).toFixed(2)}
                        </p>
                    </div>
                )}

                <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!selectedProduct || isLoadingProducts}
                    className="w-full rounded bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                    הוספת מוצר לסל
                </button>
            </div>

            <div className="mt-4 space-y-4">
                {cartItemsByCategory.size > 0 && (
                    <section className="rounded-lg bg-white p-5 shadow">
                        <h2 className="mb-4 text-xl font-semibold">פריטים שנבחרו</h2>

                        <div className="space-y-4">
                            {Array.from(cartItemsByCategory.entries()).map(
                                ([categoryName, items]) => (
                                    <div key={categoryName}>
                                        <h3 className="font-medium text-slate-700">
                                            {categoryName}
                                        </h3>
                                        <ul className="mt-2 space-y-1">
                                            {items.map((item) => (
                                                <li
                                                    key={item.id}
                                                    className="flex items-center justify-between border-b border-slate-200 pb-1"
                                                >
                                                    <span>{item.name}</span>
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-medium">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                dispatch(removeFromCart(item.id))
                                                            }
                                                            className="rounded px-2 text-lg leading-none text-red-600 hover:bg-red-100"
                                                            aria-label={`הסרת ${item.name} מהסל`}
                                                        >
                                                            x
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            )}
                        </div>
                    </section>
                )}
                {cartItems.length > 0 && (
                    <Link
                        to="/checkout"
                        className="block rounded bg-emerald-600 px-4 py-2 text-center font-medium text-white hover:bg-emerald-700"
                    >
                        להמשך להזמנה
                    </Link>
                )}
            </div>
        </main>
    );
}