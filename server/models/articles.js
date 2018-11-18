const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true,'Error title is required']
    },
    content: {
        type: String,
        required: [true,'Error content is required']
    },
    picture: {
        type: String
    },
    location : {
        name : {
            type : String
        },
        lat : {
            type : Number
        },
        lon : {
            type : Number
        }
    },
    views : {
        type : Number,
        default : 0
    },
    category : { type: Schema.Types.ObjectId, ref: 'Category' },
    author : { type: Schema.Types.ObjectId, ref: 'User' },
    comments : [ {type: Schema.Types.ObjectId, ref: 'Comment'} ]
},{
    timestamps : true
});
const Article = mongoose.model('Article', articleSchema);

module.exports = Article