const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("../Backend/db");
const cookieParser = require("cookie-parser");
const {v2} = require("cloudinary");
const Port = 5000;
const dotenv = require("dotenv");
const cloudinary = v2;

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const notificationRoute = require("./routes/notification");

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    cloud_secret: process.env.CLOUD_SECRET
})

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json()); // to parse req.body
app.use(cookieParser());
app.use(express.urlencoded({extended: true})) // to parse form data
connectDb();

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api/notifications', notificationRoute);

app.get("/", (req, res)=>{
    res.send("Twitter's server is running");
})

app.listen(Port, ()=>{
    console.log(`Server is running on port ${Port}`);
})