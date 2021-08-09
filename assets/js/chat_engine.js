
class chatEngine{

    // constructor (chatBoxID,userEmail,user_avatar,Friend_id){
    constructor (chatBoxID,userEmail,Friend_id,Avatar,Name,userid,localAvatar){
        this.chatBox=$(`#${chatBoxID}`);
        this.userEmail = userEmail;
        this.Friend_id=Friend_id;
        this.Avatar=Avatar;
        this.Name=Name;
        this.userid=userid;
        this.localavatar=localAvatar;

        this.socket = io.connect('http://localhost:5000');
        if(this.userEmail){
            this.connectionHandler();
        }       
         $('#chatusername').html( `<span class="name" id="chatusername">${this.Name}</span> `)
         $('#user_chat_profile_image').attr( 'src',this.Avatar)
        //  $('.left_img').attr( 'src',this.Avatar)
        //  $('.right_img').attr( 'src',this.localavatar)
 
    }

    connectionHandler (){
        let self = this;
        this.socket.on('connect',function(){
            console.log('connection established using socket');
             self.socket.emit('join_room', 
        {
            user_email:self.userEmail,
            ChatRoomId:self.Friend_id
        });
            self.socket.on('user_joined', function(data)
            {
                console.log('A user has joined', data);
            });
    });
      $('#send-message').click(function(event)
    {
        event.preventDefault();
        let message=$('#inputText').val();

        if(message!='')
        {
            $('#inputText').val('')
            self.socket.emit('send_message', {
                message:message,
                user_email:self.userEmail,
                user_avatar:self.Avatar,
                user_name:self.Name,
                user_id : self.userid,
                ChatRoomId:self.Friend_id,
                localavatar:self.localavatar
            });
        }
    });

        self.socket.on('recieve_message', function(data)
        {
            console.log("localavtar",data.localavatar)
            console.log("useravatar",data.user_avatar)
            console.log('Recieved some message!', data);
            let newMessage=$(`<div class="message message-left">
            <div class="avatar-wrapper avatar-small">
           
              <img class="chatimg" src="${data.user_avatar}" alt="avatar" />
            </div>
            <div class="bubble bubble-light">
            ${data.message}
            </div>
          </div>`);
           
            if(data.user_email==self.userEmail)
            {
                newMessage= $(`<div class="message message-right">
                <div class="avatar-wrapper avatar-small">
                  <img class="chatimg" src="${data.localavatar}" alt="avatar" />
                </div>
                <div class="bubble bubble-dark">
                ${data.message}
                </div>
              </div>`)
            }
            $(".chat-room").animate({
                scrollTop : $('.chat-room').prop("scrollHeight")
              },1000);
            
            $('.chat-room').append(newMessage);
        });
      
          $('#inputText').on('keydown',function(e){
              self.socket.emit('typing', { typing:true});
          });
      
          $('#inputText').on('keyup',function(e){
              setTimeout(() => {     
                   self.socket.emit('typing', { typing:false})
               }, 2000);
          });
       
        self.socket.on('display', (data)=>{
            if(data.typing==true){
            $('#feedback').text(` typing...`)
            }
            else{
            $('#feedback').text("")
            }
        })

  
    
    }
}

