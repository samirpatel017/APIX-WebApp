const chatBoxId = require('../models/chatboxid')
const Message = require('../models/message')

module.exports.chatSockets = function (socketServer) {
    let io = require('socket.io')(socketServer);
    io.sockets.on('connection',function (socket) {
        console.log('new connection is recieved ',socket.id);

        socket.on('disconnect',function(){
            console.log('connection is closed ');

        });
        
        socket.on('join_room', function(data)
        {
            console.log('joining request recieved!', data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined', data);
        });
        socket.on('send_message', async function(data)
        {
            
            let msg = await create_msg(data.message,data.user_id,data.ChatRoomId);
            
            let temp = await save_msg(msg,data.ChatRoomId);
            io.in(data.chatroom).emit('recieve_message', data);
           
        });
          //receiving a request for broadcasting
          socket.on('typing', function(data){
            if(data.typing==true){
                socket.broadcast.emit('display', data)
            }
            else{
                socket.broadcast.emit('display', data)
            }
        });
    })
}

let create_msg = async function(text,sender,cid){
    let msg = await Message.create({
        content : text,
        sender : sender,
        chatBoxId : cid
    });
    
    return msg;
}

let save_msg =async  function(msg,cid){
   
    let room;
            try{
                room =await chatBoxId.findOne({room_id:cid});
                
            }catch(err){
                room = await chatBoxId.create({room_id : cid });
            } 
            
    room.messages.push(msg);
    room.save();
    return;
}