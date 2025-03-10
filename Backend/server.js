const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/auth");
const connectDb = require("../Backend/db");
const cookieParser = require("cookie-parser");
const Port = 5000;

app.use(cors());
app.use(express.json()); // to parse req.body
app.use(cookieParser());
app.use(express.urlencoded({extended: true})) // to parse form data
connectDb();

app.use('/api/auth', authRoutes);

app.get("/", (req, res)=>{
    res.send("Twitter's server is running");
})

app.listen(Port, ()=>{
    console.log(`Server is running on port ${Port}`);
})