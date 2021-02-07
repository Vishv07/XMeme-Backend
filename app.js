require("dotenv").config();
const express = require("express");
const app = express();
const mangoose = require("mongoose");
const cookieparser = require('cookie-parser');
var bodyParser = require('body-parser')
const cors = require('cors');
const memeRoutes = require("./routes/meme.js");
const port = process.env.PORT || 8001;
//DATABASE CONNECTION WITH MONGODB


app.use(bodyParser.json())
app.use(cookieparser());
app.use(cors());
// app.use(express.static('dist'));
//ROUTES
app.get('/',(req,res,next)=>{
    res.json({
        'message': "Done"
    })
})
// app.use("/memes",memeRoutes);

mangoose
    .connect(process.env.DB || "mongodb://localhost/testDB",{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify: false,
        useCreateIndex:true,
        }).then(()=>{
            console.log("DB CONNECTED");
        }).catch((err) =>{
            console.log(err);
});
app.listen(port, () => {
    console.log(`app is running on ${port}`);
});
