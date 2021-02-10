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
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerPort = 8080



//DATABASE CONNECTION WITH MONGODB
console.log(process.env.DB);
mangoose
    .connect( process.env.DB || "mongodb://localhost:27017/crio-stage-2",{
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
/**
 * @swagger
 * /memes:
 *    get:
 *      summary: List all Memes
 *      description: Create a Meme
 *      responses:
 *        201:
 *          description: Get all Memes
 */

 /**
 * @swagger
 * /memes/{id}:
 *  get:
 *     summary: List all Memes
 *     description: Create a Meme
 *     parameters:
  *      - name: id
  *        in: path
  *        desccription: id of a meme
 *     responses:
 *        201:
 *          description: Get all Memes
 */
app.get('/',(req,res,next)=>{
    res.json({
        'Crio-Stage-2': "Completed"
    })
})
/**
 * @swagger
 * /memes:
 *   post:
 *     summary: Create a meme
 *     parameters:
 *      - name: reqBody
 *        in: body
 *        desccription: request body
 *        schema:
 *          type: object
 *          properties:
 *              name:
 *                type: string
 *              caption:
 *                type: string
 *              url:
 *                type: string
 *          required:
 *              -name
 *              -caption
 *              -url
 *     responses:
 *        '200':
 *            description: Created
 *        '409':
 *            description: Duplicate Payload
 *        '500':
 *            description: Network error
 *          
 */

app.use("/memes",memeRoutes);
 /**
 * @swagger
 * /memes/{id}:
 *  patch:
 *     summary: List all Memes
 *     description: Create a Meme
 *     parameters:
  *      - name: id
  *        in: path
  *        desccription: id of a meme
  *      - name: reqBody
 *        in: body
 *        desccription: request body
 *        schema:
 *          type: object
 *          properties:
 *              caption:
 *                type: string
 *              url:
 *                type: string
 *          required:
 *              -caption
 *              -url
 *     responses:
 *        201:
 *          description: Get all Memes
 */
//Listening on 8081
app.listen(port, () => {
    console.log(`app is running on ${port}`);
});

// Swegger

app.use(cors())
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Xmeme-APIS",
        description: "Crio Stage  2",
        contact: {
          name: "Developer"
        },
        servers: ["http://localhost:8080"]
      }
    },
    // ['.routes/*.js']
    apis: ["app.js"]
  };
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/swagger-ui', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.listen(swaggerPort, () => {
     console.log('Swagger up and running on'+swaggerPort)
})