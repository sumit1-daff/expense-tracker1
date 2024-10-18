import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from './src/routes/authRouter.js' 
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();

const corsOption = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOption))

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/expense-tracker").then(()=>{
    console.log("Db connected Successfully");
  })
}
main()
app.use("/auth/", authRouter);
app.get("/", (req, res) => {
  // res.cookie("cookie","cookievalue");
  // res.cookie("sumit","singh");
  res.send("BACKEND FOR THE EXPENSE TRACKER APP");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
