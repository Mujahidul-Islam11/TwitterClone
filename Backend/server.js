const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("../Backend/db");
const cookieParser = require("cookie-parser");
const {v2} = require("cloudinary");
const Port = 5000;
const dotenv = require("dotenv");
const cloudinary = v2;

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    cloud_secret: process.env.CLOUD_SECRET
})

app.use(cors());
app.use(express.json()); // to parse req.body
app.use(cookieParser());
app.use(express.urlencoded({extended: true})) // to parse form data
connectDb();

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get("/", (req, res)=>{
    res.send("Twitter's server is running");
})

app.listen(Port, ()=>{
    console.log(`Server is running on port ${Port}`);
})