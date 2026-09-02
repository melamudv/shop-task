import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/store/hooks";

export function Header() {
    const itemsCount = useAppSelector((state) =>
        state.cart.items.reduce((total, item) => total + item.quantity, 0)
    );

    return (
        <header className="bg-slate-900 text-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
                <NavLink to="/" className="text-xl font-bold">
                    חנות
                </NavLink>

                <nav className="flex gap-4">
                    <NavLink to="/" className="hover:text-sky-300">
                        קטלוג
                    </NavLink>
                    <NavLink to="/checkout" className="hover:text-sky-300">
                        סל ({itemsCount})
                    </NavLink>
                    <NavLink to="/orders" className="hover:text-sky-300">
                        הזמנות
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}