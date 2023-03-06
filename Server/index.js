const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const dataRoutes = require("./routes/dataRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes);
app.use("/api/messages",dataRoutes);
require("dotenv").config();

mongoose.connect(process.env.ATLAS_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    console.log("db is connected successfully");
}).catch((e)=> {
    console.log(e.message);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
})