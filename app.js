require("dotenv").config();
const express = require("express");
const app = express();
const mangoose = require("mongoose");
const cookieparser = require('cookie-parser');
var bodyParser = require('body-parser')
const cors = require('cors');
const memeRoutes = require("./routes/meme.js");

//DATABASE CONNECTION WITH MONGODB
mangoose
    .connect(process.env.DB,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        }).then(()=>{
            console.log("DB CONNECTED");
        }).catch((err) =>{
            console.log(err);
});

app.use(bodyParser.json())
app.use(cookieparser());
app.use(cors());

//ROUTES
app.use("/meme",memeRoutes);

app.listen(process.env.PORT, () => {
    console.log(`app is running on ${process.env.PORT}`);
});
