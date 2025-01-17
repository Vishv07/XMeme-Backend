var express = require('express');
const { check } = require('express-validator');
var router = express.Router();
const {newMeme,getAllMemes,getMemeByID,updateMeme} = require("../controllers/memeController.js")

// To Create a new Meme

router.post('',newMeme);

// To Fetch all memes
router.get('',getAllMemes);

// To Fetch meme by ID
router.get('/:id',getMemeByID);

// To Update meme by ID
router.patch('/:id',updateMeme)

module.exports = router;