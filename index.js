const express =require("express");
const app=express();
const port=3000;
const mongoose=require('mongoose')
require('dotenv').config();
const userRoute=require("./router/users")
const postRoutes = require('./router/posts');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(userRoute)
app.use(postRoutes);


app.listen(port,()=>{
    console.log("listening to 3000")
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("MongoDB connection error:", err));

})