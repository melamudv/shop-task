import { Router } from "express";
import {
    createOrder,
    getOrders,
} from "../controllers/order.controller";

export const orderRouter = Router();

orderRouter.post("/", createOrder);
orderRouter.get("/", getOrders);