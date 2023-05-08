import express from "express";
import { sendEmail } from "./src/index.js";

const app = express();

app.get("/", (req, res) => {
  res.send("别访问了,啥也没有~");
  console.log("has been visited");
});

sendEmail();
export default app;
