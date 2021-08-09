const mongoose = require('mongoose');

const chatboxid = new mongoose.Schema({
    room_id : {
        type : String,
        required : true
    },
    messages : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
},{
    timestamps:true
})

const chatBoxId = mongoose.model('chatBoxId', chatboxid);

module.exports = chatBoxId;