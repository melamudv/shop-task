import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { env } from "./config/env";
import { orderRouter } from "./routes/order.routes";

const app = express();

app.use(
    cors({
        origin: env.clientUrl,
    })
);

app.use(express.json());
app.use("/api/orders", orderRouter);

app.get("/", (_request, response) => {
    response.json({ message: "Orders API is running" });
});

async function start() {
    await mongoose.connect(env.mongoDbUri);

    app.listen(env.port, () => {
        console.log(`Orders API is running on http://localhost:${env.port}`);
    });
}

start().catch((error: unknown) => {
    console.error("Unable to start Orders API.", error);
    process.exit(1);
});