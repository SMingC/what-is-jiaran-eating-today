import express from "express";
import { canteens, TakeAways } from "./src/data/nchu-food.js";
import { sendEmail } from "./src/index.js";

const app = express();
app.use(express.json()); // 解析json

app.get("/", (req, res) => {});

sendEmail(["2063808831@qq.com", "1115499597@qq.com"], canteens, TakeAways);
export default app;
