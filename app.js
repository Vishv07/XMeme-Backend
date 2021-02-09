require("dotenv").config();
const express = require("express");
const app = express();
const mangoose = require("mongoose");
const cookieparser = require('cookie-parser');
var bodyParser = require('body-parser')
const cors = require('cors');
const memeRoutes = require("./routes/meme.js");
const meme = require("./models/meme.js");
const port = process.env.PORT || 8081;


//DATABASE CONNECTION WITH MONGODB
mangoose
    .connect( process.env.DB || "mongodb://localhost/testDB",{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify: false,
        useCreateIndex:true,
        }).then(()=>{
            console.log("DB CONNECTED");
        }).catch((err) =>{
            console.log(err);
});

//MiddleWares
app.use(bodyParser.json())
app.use(cookieparser());
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
  }));


//ROUTES
app.get('/',(req,res,next)=>{
    res.json({
        'Crio-Stage-2': "Completed"
    })
})
app.use("/memes",memeRoutes);

//Listening on 8081
app.listen(port, () => {
    console.log(`app is running on ${port}`);
});


