import express from "express";
import dotenv from "dotenv";
const app = express();
import cookieParser from "cookie-parser";
app.use(cookieParser());
dotenv.config();

import cors from "cors";
const corsOption = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOption))

import mongoose from "mongoose";
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/expense-tracker")
}
app.use(express.json());

import authRouter from './src/routes/users.js'
app.use("/auth/", authRouter);
app.get("/", (req, res) => {
  res.send("BACKEND FOR THE EXPENSE TRACKER APP");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
