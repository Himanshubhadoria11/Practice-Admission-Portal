const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        Required: true,
    },
    email: {
        type: String,
        Required: true,
    },
    phone: {
        type: String,
        Required: true,
    },

    address: {
        type: String,
        Required: true,
    },
    comment:{
        type:String,
        default:"Pending"
    },
   
    user_id:{
        type: String,
        Required: true,
    }
    
    
}, { timestamps: true })
const ContactModel = mongoose.model('contact', ContactSchema)
module.exports = ContactModel