import dotenv from 'dotenv';
import express from "express"
const app = express();
import cors from 'cors'
// import bodyParser from 'body-parser'
import userRouter from './src/routes/users.js'

dotenv.config();
import mongoose from 'mongoose'

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker');
}
app.use(cors());
app.use(express.json());
app.use('/auth/', userRouter.router);
app.get('/', (req, res) => {
    res.send('BACKEND FOR THE EXPENSE TRACKER APP');
})
app.post('/',(req,res)=>{
    console.log("hii");
    console.log(req.body);
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})