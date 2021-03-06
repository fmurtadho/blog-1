const User = require('../models/users')
const { encrypt } = require('../helpers')
const jwt  = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt')

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Controller {
    static signup(req,res){
        let checkname = req.body.name.length
        let checkemail = validateEmail(req.body.email)
        let checkpassword = req.body.password.length

        // cek panjang input name dan password
        if(checkname < 4 || checkpassword < 4){
            return res.status(422).json({
                message : 'Minimum name & password length is 4'
            })
        }

        // cek format email
        if(checkemail !== true){
            return res.status(422).json({
                message : 'Invalid email format'
            })
        }

        encrypt(req.body.password)
        .then(function(encryptedPassword) {
            let newUser = new User({
                name:  req.body.name,
                email:   req.body.email,
                password: encryptedPassword,
                avatar : 'http://placehold.it/50x50',
                age : null,
                bio : null,
                isadmin : false
            })
            return newUser
        })
        .then(function(newUser) {
            newUser.save()
            res.status(201).json({
                message : 'signup success',
                user : newUser
            })
        })
        .catch(function(err){
        //    console.log(err)
           res.status(500).json({
               message : 'failed to create user',
               err : err
           })
        })
    }

    static signin(req,res){
        User.findOne({
            email : req.body.email
        })
        .then(function(dataUser){
            let decrypt = bcrypt.compareSync(req.body.password, dataUser.password); // true
            if(decrypt == true){
                let token = jwt.sign({
                    userId : dataUser._id,
                    name : dataUser.name,
                    email : dataUser.email
                }, process.env.SECRET_KEY)

                res.status(200).json({
                    userId : dataUser._id,
                    name : dataUser.name,
                    email : dataUser.email,
                    token : token
                })
            }else{
                res.status(500).json({
                    message : 'Invalid password'
                })
            }
        })
        .catch(function(){
            res.status(500).json({
                message : `Invalid email`
            })
        })
    }

    static read(req,res){
        User.find()
            .then(function (allUser) {
                res.status(201).json({
                    allUser
                })
            })
            .catch(function (err) {
                res.status(500).json({
                    err
                })
            })
    }

    static readOne(req,res){
        User.findById(req.params.id)
        .populate('followers')
        .populate('following')
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'failed to find user',
                err : err
            })
        })
    }

    static update(req,res){
        User.findOneAndUpdate({
            _id : req.userData._id
        }, {
            name : req.body.name,
            email : req.body.email,
            age : req.body.age,
            avatar : req.body.avatar,
            bio : req.body.bio
        })
        .then(function (task) {
            res.status(200).json({
                message: `update completed...`
            })
        })
        .catch(function (err) {
            res.status(500).json({
                message : 'update failed'
            })
        })
    }

    static follow(req,res){
        // console.log('follow controller',req.userId,req.params.id)
        User.findOneAndUpdate({
            _id : req.userId
        },{
            $push : {
                following : req.params.id
            }
        },{
            new : true
        })
        .then((updatedUser)=>{
            // res.status(200).json(updatedUser)
            User.findOneAndUpdate({
                _id : req.params.id
            },{
                $push : {
                    followers : req.userId
                }
            },{
                new : true
            })
            .then((updatedAuthor)=>{
                res.status(200).json(updatedAuthor)
            })
            .catch((err)=>{
                res.status(500).json({
                    message : "Error in updating author followers"
                })
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'Error Follow User'
            })
        })
    }

    static unfollow(req,res){
        // console.log('unfollow controller',req.userId,req.params.id)
        User.findOneAndUpdate({
            _id : req.userId
        },{
            $pull : {
                following : req.params.id
            }
        },{
            new : true
        })
        .then((updatedUser)=>{
            // res.status(200).json(updatedUser)
            User.findOneAndUpdate({
                _id : req.params.id
            },{
                $pull : {
                    followers : req.userId
                }
            },{
                new : true
            })
            .then((updatedAuthor)=>{
                res.status(200).json(updatedAuthor)
            })
            .catch((err)=>{
                res.status(500).json({
                    message : "Error in updating author followers"
                })
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : "Error Unfollow User"
            })
        })
    }
}

module.exports = Controller;