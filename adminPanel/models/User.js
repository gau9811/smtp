let mongoose = require('mongoose')
let  { Schema } = mongoose



let UserSchema = new Schema({
    name:{
        type: String,
        required:true
    },

    image:{
        type:Buffer,
    },

    email:{
        type:String,
        required:true

    },

    password:{
        type:String,
        required:true
    },

    role:{
       type:Number,
       required:true,
       default:0
    },

    date:{
        type:Date,
        default:Date.now()
    }
})


module.exports = User = mongoose.model('user', UserSchema)

