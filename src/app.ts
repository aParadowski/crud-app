import express from "express";
import itemsRouter from "./routes/items.routes";

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/items', itemsRouter);
app.use('/', itemsRouter);

export default app;
