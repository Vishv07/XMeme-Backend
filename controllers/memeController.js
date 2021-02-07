const {validationResult} = require("express-validator");
const Meme = require("../models/meme");

exports.newMeme = async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            err: errors.array()[0].msg
        })
    }
    const meme = new Meme(req.body);
    const DuplicateMeme = await Meme.findOne({
        name: req.body.name,
        url: req.body.url
    })

    if (DuplicateMeme) {
        return res.status(409).json({
            sucess: false,
            error: 'Meme Already Exists!'
        })
    }

    meme.save((err, newMeme) => {
        if (err) {
            return res.status(400).json({
                err: "Not saved"
            })
        }
        res.status(200).json({
            name: newMeme.name,
            url: newMeme.url,
            caption: newMeme.caption,
        });
    })
};
// For Empty the Document
// Meme.deleteMany({})

exports.getAllMemes = function(req, res) {

    Meme.find().select('-__v').exec((err, memes) => {
        if (err || !memes) {
            return res.status(400).json(memes)
        }
        res.status(200).json(memes.reverse());
    })
};

exports.getMemeByID = function(req, res) {

    Meme.find({_id:req.params.id}).select('-__v').exec((err, memes) => {
        if (err || !memes) {
            return res.status(400).json(memes)
        }
        res.status(200).json(memes);
    })
};


exports.updateMeme = function(req,res) {
    const newUrl = req.body.url
    const newCap = req.body.caption;
    console.log(newUrl);
    console.log(newCap);
    Meme.findOneAndUpdate( {_id: req.params.id},
        {url:newUrl,caption:newCap},
        (err, updatedMeme) => {
            if(err){
                console.error(err);
                return res.status(500).json({
                    err: "Unable to edit Meme."
                })
            }
            console.log(newUrl);
            console.log(newCap);
            return res.status(204).json({
                name: updatedMeme.name,
                url: updatedMeme.url,
                caption: updatedMeme.caption,
            })
        }
    )
};
