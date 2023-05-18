import express from "express";
import { sendEmail } from "./src/index.js";

const app = express();
app.use(express.json()); // 解析json

app.get("/", (req, res) => {});

sendEmail().start();
export default app;
