const express=require('express');
const{connection}=require('./config/db');
const{ noticerouter}=require("./routes/NoticeRoute");
const cors=require("cors")
require('dotenv').config();

const app=express();
app.use(cors({
    origin:"*"
}))
app.use(express.json());

app.get("/",(req,res)=>{
    res.json("welcome")
})
app.use("/notice",noticerouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to Database");
        console.log(`Server is running on port ${process.env.port}`)
    } catch (error) {
        console.log('Error While Connecting to Database');
        console.log(error)
    }
})