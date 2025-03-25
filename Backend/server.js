const dotenv = require("dotenv");
dotenv.config()
const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("../Backend/db");
const cookieParser = require("cookie-parser");
const Port = 5000;

const authRoute = require("./routes/auth.router");
const userRoute = require("./routes/user.router");
const postRoute = require("./routes/post.router");
const notificationRoute = require("./routes/notification.router");

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json({limit: '5mb'})); // to parse req.body
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