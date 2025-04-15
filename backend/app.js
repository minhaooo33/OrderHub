import fs from "node:fs/promises";
import crypto from "node:crypto";
import bodyParser from "body-parser";
import express from "express";

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/meals", async (req, res) => {
  const meals = await fs.readFile("./data/available-meals.json", "utf8");
  res.json(JSON.parse(meals));
});

app.post("/orders", async (req, res) => {
  const orderData = req.body.order;

  if (
    orderData === null ||
    orderData.items === null ||
    orderData.items.length === 0
  ) {
    return res.status(400).json({ message: "Missing data." });
  }

  if (
    orderData.table === undefined ||
    orderData.table === null ||
    orderData.table === ""
  ) {
    return res.status(400).json({
      message: "Missing table number.",
    });
  }

  const orders = await fs.readFile("./data/orders.json", "utf8");
  const allOrders = JSON.parse(orders);

  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const todayOrders = allOrders.filter(
    (order) => order.id && order.id.startsWith(`ORD-${dateStr}`)
  );
  const nextOrderNumber = String(todayOrders.length + 1).padStart(4, "0");

  const newOrder = {
    table: orderData.table,
    createdAt: new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" }),
    totalAmount: orderData.totalAmount,
    items: orderData.items,
    id: `ORD-${dateStr}-${nextOrderNumber}`,
    verifyToken: crypto.randomUUID(),
  };

  allOrders.push(newOrder);
  await fs.writeFile("./data/orders.json", JSON.stringify(allOrders, null, 4));
  res.status(201).json({
    message: "Order created!",
    id: newOrder.id,
    verifyToken: newOrder.verifyToken,
  });
});

app.get("/verify-order", async (req, res) => {
  const { id, token } = req.query;

  if (!id || !token) {
    return res.status(400).json({ message: "Missing id or token." });
  }

  const orders = await fs.readFile("./data/orders.json", "utf8");
  const allOrders = JSON.parse(orders);
  const order = allOrders.find((o) => o.id === id && o.verifyToken === token);

  if (!order) {
    return res.status(404).json({ message: "Invalid or expired token." });
  }

  res.status(200).json({ message: "Order verified", order });
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

app.listen(3000);
