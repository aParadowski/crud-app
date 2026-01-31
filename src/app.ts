import express from "express";
import itemsRouter from "./routes/items.routes";

const app = express();

app.use(express.json());

app.use('/items', itemsRouter);

app.get('/', (req, res) => {
  res.send('Server is running');
});

export default app;
