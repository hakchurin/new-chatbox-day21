import $ from 'jquery';
import moment from 'moment';

$('.second-page').addClass('hidden');



var loginInput = $('#login-input');
var loginBtn = $('#login-btn');
var modalContainer = $('.modal-container');

function LoginConstructor(username) {
    this.username = username;
}
var user = new LoginConstructor();
loginBtn.on('click', function() {
    user.username = loginInput.val();
    $('.second-page').removeClass('hidden ');
    $('.first-page').addClass('hidden');

    messageDisplay();
});



var messageInput = $('#message-input[type="text"]');
var messageBtn = $('#message-btn');
var messageContent = $('.message-container');
var outputContent = $('.sent-messages');



function MessageConstructor(message, user) {
    this.message = message;
    this.sender = user.username;
    this.stamp = moment().format("MM-DD-YYYY");
}



$(messageBtn).on('click', function() {
    var message = new MessageConstructor(messageInput.val(), user);
    var $li = $(`<li>${message.sender} ${message.stamp}  ${message.message}</li>`);

    console.log(message);


    $(messageInput).val('');

    messageContent.append($li);
    message.save();
});





MessageConstructor.prototype.save = function() {
    $.ajax({
        dataType: 'json',
        url: 'http://tiny-za-server.herokuapp.com/collections/hakchurinchat',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(this),
        success: (response) => {


        }
    });
};



function messageDisplay() {

    $.ajax({
        dataType: 'json',
        url: 'https://tiny-za-server.herokuapp.com/collections/hakchurinchat',
        type: 'GET',
        success: function(response) {

            response.forEach(function(messageObjs) {
                    let $messageBox = $(`
                      <li>
                        <h3>${messageObjs.sender}</h3>
                        <p>${messageObjs.message}</p>
                      </li>
                      `);
                    $('.message-container').append($messageBox);
                    console.log(messageObjs);

                }

            );
        }
    });
}






//             // do something to display messages to the user
//             // get a container then add stuff to it
//             // append is add stuff




// clearAPI();

function clearAPI() {
    console.log('clearing');
    $.ajax({
        url: 'https://tiny-za-server.herokuapp.com/collections/hakchurinchat',
        type: 'GET',
        success: function(response) {
            response.forEach(function(user) {
                $.ajax({
                    url: 'https://tiny-za-server.herokuapp.com/collections/hakchurinchat/' + user._id,
                    type: 'DELETE',
                    contentType: 'application/json',
                    success: function(response) {
                        console.log('DELETED', user._id);
                    }
                });
            });
        }
    });
}





//hide 2nd page
//input field for user to type in username
// button to login
//on click button to go to next page
//var to keep track of user
//make obj to kep track of usersname...constructor

//2 model window
//create a container for the user message area
//create a container for the chat area

// ajax to get the messages and displayed user info....what does it get/send and what does it do on the sucess
/// GET and do it again
//button to send message
//on click button to send message
//ajax to send the message
//the request itself what does it send...
//obj 3 properties of username timestamp and message...constructor
//when sucessful post/add to the container


//messages display usersname and timestamp
