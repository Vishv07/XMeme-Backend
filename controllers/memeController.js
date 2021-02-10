const {validationResult} = require("express-validator");
const Meme = require("../models/meme");
const isImageUrl = require('is-image-url');
var request = require('request');
// Create a new Meme
exports.newMeme = async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            err: errors.array()[0].msg
        })
    }
    const meme = new Meme(req.body);

    // Check Duplicate Payload
    const DuplicateMeme = await Meme.findOne({
        name: req.body.name,
        url: req.body.url
    })
    if (DuplicateMeme) {
        return res.status(409).json({
            success: false,
            msg:"Meme already Exists!"
        })
    }


    // validate the url
    if(!checkURL(req.body.url)){
        return res.status(409).json({
            success: false,
            msg:"Please Enter valid URL"
        })
    }

    meme.save((err, newMeme) => {
        if (err) {
            return res.status(400).json({
                err: "Not saved"
            })
        }
        res.status(200).json({
            id: newMeme._id
        });
    })
};

// Fetch all Memes from DB in reverse order
exports.getAllMemes = function(req, res) {

    // in case there is large records fatch 100 only
    Meme.find().limit(100).select('-__v').exec((err, memes) => {
        if (err || !memes) {
            return res.status(400).json(memes)
        }
        res.status(200).json(memes.reverse());
    })
};


// Fetch Meme By specific ID
exports.getMemeByID = function(req, res) {

    Meme.find({_id:req.params.id}).select('-__v').exec((err, memes) => {
        if (err || !memes) {
            return res.status(400).json(memes)
        }
        res.status(200).json(memes);
    })
};

// Update Meme url and caption By specific ID
exports.updateMeme = async function(req,res) {
    const newUrl = req.body.url
    const newCap = req.body.caption;

  // validte the url while updatation
    if(!checkURL(req.body.url)){
        return res.status(409).json({
            success: false,
            msg:"Please Enter valid URL"
        })
    }

    Meme.findOneAndUpdate( {_id: req.params.id},
        {url:newUrl,caption:newCap},
        (err, updatedMeme) => {
            if(err){
                console.error(err);
                return res.status(500).json({
                    err: "Unable to edit Meme."
                })
            }
            return res.status(204).json({
                name: updatedMeme.name,
                url: updatedMeme.url,
                caption: updatedMeme.caption,
            })
        }
    )
};

//function that validate the url
function checkURL(URL) {
    return(URL.match(/\.(jpeg|jpg|gif|png)$/) != null);
}




// For Empty the Document
// Meme.deleteMany({})
