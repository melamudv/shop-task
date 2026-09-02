import { Request, Response } from "express";
import { Order } from "../models/order.model";

type CreateOrderItem = {
    productId: number;
    name: string;
    categoryId: number;
    categoryName: string;
    price: number;
    quantity: number;
};

type CreateOrderBody = {
    customerName: string;
    email: string;
    address: string;
    items: CreateOrderItem[];
};

function isValidOrderItem(item: unknown): item is CreateOrderItem {
    if (!item || typeof item !== "object") {
        return false;
    }

    const value = item as Record<string, unknown>;

    return (
        typeof value.productId === "number" &&
        value.productId > 0 &&
        typeof value.name === "string" &&
        value.name.trim().length > 0 &&
        typeof value.categoryId === "number" &&
        value.categoryId > 0 &&
        typeof value.categoryName === "string" &&
        value.categoryName.trim().length > 0 &&
        typeof value.price === "number" &&
        value.price >= 0 &&
        typeof value.quantity === "number" &&
        Number.isInteger(value.quantity) &&
        value.quantity > 0
    );
}

export async function createOrder(
    request: Request<object, object, CreateOrderBody>,
    response: Response
) {
    const { customerName, email, address, items } = request.body;

    const isValid =
        typeof customerName === "string" &&
        /\p{L}/u.test(customerName.trim()) &&
        typeof email === "string" &&
        email.trim().length > 0 &&
        typeof address === "string" &&
        /\p{L}/u.test(address.trim()) &&
        Array.isArray(items) &&
        items.length > 0 &&
        items.every(isValidOrderItem);

    if (!isValid) {
        return response.status(400).json({
            message: "Invalid order data.",
        });
    }

    const totalPrice = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const order = await Order.create({
        customerName: customerName.trim(),
        email: email.trim().toLowerCase(),
        address: address.trim(),
        items,
        totalPrice,
    });

    return response.status(201).json(order);
}

export async function getOrders(_request: Request, response: Response) {
    const orders = await Order.find().sort({ createdAt: -1 });

    return response.json(orders);
}