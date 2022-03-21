
const User = require("../models/user.models");
const Comment = require("../models/comment.model");
const Book = require("../models/book.models");
const Publication  = require("../models/publication.model");
const extra  = require("../models/extra.models");
const jwt = require('jsonwebtoken');
require('dotenv').config()

const generateToken = (user) => {
    return jwt.sign({user}, process.env.SECRET_KEY)
}
const register = async (req, res) => {
    try{
        let user = await User.findOne({email : req.body.email})
   

        //checking email
        if(user){
            return res.status(400).send({message : "Email already exists" })
        }

        // if new user, create it or allow to register;
        user = await User.create(req.body);

        const token = generateToken(user)
        return res.status(200).send({user, token});
    }
    catch(err){
        res.status(400).send({message : err.message})
    }
}

module.exports = {register};