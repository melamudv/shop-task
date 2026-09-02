export type OrderItem = {
    productId: number;
    name: string;
    categoryId: number;
    categoryName: string;
    price: number;
    quantity: number;
};

export type CreateOrderRequest = {
    customerName: string;
    email: string;
    address: string;
    items: OrderItem[];
};

export type Order = CreateOrderRequest & {
    _id: string;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
};