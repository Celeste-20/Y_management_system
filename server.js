const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")
const app = express()

//users.js
const users=require("./routes/api/users")
const profiles=require("./routes/api/profiles")


//DB config
const  db = require("./config/key").mongoURI

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Connect to mongodb
mongoose.connect(db)
    .then(()=> console.log("MongoDB Connected"))
    .catch(err=> console.log(err));

//passport初始化
app.use(passport.initialize())
require("./config/passport")(passport);

// app.get("/",(req,res)=>{
//     res.send("Hello World!");
// })

app.use("/api/users",users)
app.use("/api/profiles",profiles)


const port = process.env.POPT || 5000;

app.listen(port,()=>{
    console.log('Server running on port ${port}');;
})