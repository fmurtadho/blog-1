const User = require('../models/users')
const Article = require('../models/articles')
const myComment = require('../models/comments')
const jwt = require('jsonwebtoken')
const Mongoose = require('mongoose');

class Middleware {
    static authenticate(req, res, next) {
        let token = req.headers.token
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
                if (!err) {
                    User.findById(decoded.userId)
                        .then(function (user) {
                            req.userData = user
                            req.userId = user._id
                            next()
                        })
                } else {
                    res.status(500).json({
                        message: 'Invalid Token'
                    })
                }
            })
        } else {
            res.status(500).json({
                message: 'Token Not Found'
            })
        }
    }

    static isOwner(req,res,next){
        Article.findById(req.params.id)
        .then((article)=>{
            let articleAuthor = article.author.toString()
            let userId = req.userId.toString()

            if(articleAuthor === userId){
                next()
            }else{
                res.status(401).json({
                    message : "Can't Modify Other User Article"
                })
            }
        })
        .catch((err)=>{
            res.status(500).json({
                message : `Can't find specified article`
            })
        })
    }

    static isCommentOwner(req,res,next){
        myComment.findById(req.params.id)
        .then((comment)=>{
            if(comment.user.toString()===req.userId.toString()){
                next()
            }else{
                res.status(401).json({
                    message : `Can't delete other user comment`
                })
            }
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'Error Reading Comment Data'
            })
        })
    }
}

module.exports = Middleware;