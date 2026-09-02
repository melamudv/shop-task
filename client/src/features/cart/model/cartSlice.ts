import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../../entities/product/model";

export type CartItem = Product & {
    quantity: number;
    categoryName: string;
};

type CartState = {
    items: CartItem[];
};

const initialState: CartState = {
    items: [],
};

type AddToCartPayload = {
    product: Product;
    categoryName: string;
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.product.id
            );

            if (existingItem) {
                existingItem.quantity += 1;
                return;
            }

            state.items.push({
                ...action.payload.product,
                categoryName: action.payload.categoryName,
                quantity: 1,
            });
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },

        changeQuantity: (
            state,
            action: PayloadAction<{ productId: number; quantity: number }>
        ) => {
            const item = state.items.find(
                (cartItem) => cartItem.id === action.payload.productId
            );

            if (!item) {
                return;
            }

            if (action.payload.quantity <= 0) {
                state.items = state.items.filter(
                    (cartItem) => cartItem.id !== action.payload.productId
                );
                return;
            }

            item.quantity = action.payload.quantity;
        },

        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    changeQuantity,
    clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;