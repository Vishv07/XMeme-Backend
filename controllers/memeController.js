const {
    validationResult
} = require("express-validator");
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
        return res.json({
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
        res.json({
            name: newMeme.name,
            url: newMeme.url,
            caption: newMeme.caption,
        });
    })
};
exports.getAllMemes = function(req, res) {

    Meme.find().select('-__v').exec((err, memes) => {
        if (err || !memes) {
            return res.status(400).json({
                err: "no memes found"
            })
        }
        res.json(memes);
    })
};