import { InferSchemaType, Schema, model } from "mongoose";

const orderItemSchema = new Schema(
    {
        productId: {
            type: Number,
            required: true,
            min: 1,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        categoryId: {
            type: Number,
            required: true,
            min: 1,
        },
        categoryName: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    { _id: false }
);

const orderSchema = new Schema(
    {
        customerName: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: (value: string) => /\p{L}/u.test(value),
                message: "Customer name must contain at least one letter.",
            },
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: (value: string) => /\p{L}/u.test(value),
                message: "Address must contain at least one letter.",
            },
        },
        items: {
            type: [orderItemSchema],
            required: true,
            validate: {
                validator: (items: unknown[]) => items.length > 0,
                message: "An order must contain at least one item.",
            },
        },
        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export type OrderDocument = InferSchemaType<typeof orderSchema>;

export const Order = model("Order", orderSchema);