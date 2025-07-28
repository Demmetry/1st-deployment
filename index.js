const express =require("express");
const app=express();
const port=3000;
const mongoose=require('mongoose')
require('dotenv').config();
const userRoute=require("./router/users")
const postRoutes = require('./router/posts');
   const cors = require('cors');
   
   app.use(express.json())
   app.use(express.urlencoded({ extended: true }));
   
app.use(cors({
  origin: 'http://localhost:3000', // allow frontend dev server
  credentials: true                // if you use cookies or auth
}));
app.use(userRoute)
app.use(postRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) => console.error("MongoDB connection error:", err));

// app.listen(port,()=>{
//     console.log("listening to 3000")

// })

module.exports=app;