import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CatalogPage } from "./pages/catalog/CatalogPage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { Header } from "./widgets/header/Header";

export default function App() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path="/" element={<CatalogPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}