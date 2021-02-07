var express = require('express');
const { check } = require('express-validator');
var router = express.Router();
const {newMeme,getAllMemes} = require("../controllers/memeController.js")

// for accept memes
router.post('',[
    check("name","Plese enter a valid meme").isLength({min:3})
],newMeme);

router.get('',getAllMemes);

module.exports = router;