const mongoose = require('mongoose')

const CommunityJobSchema= new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Title is required'],
        maxlength: 40,
        minlength: 8,
    },
    desc: {
        type: String, 
        required:[true, "Description is required"],
    },
    createdBy:{
        type: String,
        required: true
    },
    images:{
        type: [String],
        required: false
    },
    completed:{
        type: Boolean,
        default: false
    },
    volunteers:{
        type:[String]
    }

})

module.exports = mongoose.model("CommunityJob", CommunityJobSchema)