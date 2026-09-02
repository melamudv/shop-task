import type {
    CreateOrderRequest,
    Order,
} from "../../entities/order/model";
import { ORDERS_API_URL } from "../config/api";

export async function createOrder(data: CreateOrderRequest): Promise<Order> {
    const response = await fetch(`${ORDERS_API_URL}/api/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Unable to create order.");
    }

    return response.json() as Promise<Order>;
}

export async function getOrders(): Promise<Order[]> {
    const response = await fetch(`${ORDERS_API_URL}/api/orders`);

    if (!response.ok) {
        throw new Error("Unable to load orders.");
    }

    return response.json() as Promise<Order[]>;
}