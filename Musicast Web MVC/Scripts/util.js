$(function () {
    $('#chatBody').hide();
    $('#loginBlock').show();
    // Ссылка на автоматически-сгенерированный прокси хаба
    var chat = $.connection.chatHub;
    // Объявление функции, которая хаб вызывает при получении сообщений
    chat.client.addMessage = function (name, message, date) {
        // Добавление сообщений на веб-страницу 
        $('#chatroom').append('<p class="message"><b>' + htmlEncode(name)
            + '</b> at ' + htmlEncode(date) + ': ' + message + '</p>');
        var chatmsglist = document.getElementById('chatroom');
        chatmsglist.scrollTop = 9999;
    };

    // Функция, вызываемая при подключении нового пользователя
    chat.client.onConnected = function (id, userName, allUsers) {

        $('#loginBlock').hide();
        $('#chatBody').show();
        // установка в скрытых полях имени и id текущего пользователя
        $('#hdId').val(id);
        $('#username').val(userName);
        $('#header').html('<h3>Welcome, ' + userName + '</h3>');

        // Добавление всех пользователей
        for (i = 0; i < allUsers.length; i++) {

            AddUser(allUsers[i].ConnectionId, allUsers[i].Name);
        }
    }

    // Добавляем нового пользователя
    chat.client.onNewUserConnected = function (id, name) {

        AddUser(id, name);
    }

    // Удаляем пользователя
    chat.client.onUserDisconnected = function (id, userName) {

        $('#' + id).remove();
    }

    var timeout;
    // Display typing
    chat.client.onTypingMessage = function (userName) {
        clearTimeout(timeout);
        $('#typing').text(userName + " typing a message...");
        timeout = setTimeout(function () {
            clearTyping();
        }, 3000);
    }

    // Открываем соединение
    $.connection.hub.start().done(function () {

        jQuery('#message').on('input', function () {
            chat.server.typing($('#username').val());
        });

        $('#sendmessage').click(function () {
            // Вызываем у хаба метод Send
            if ($('#message').val() != '') {
                chat.server.send($('#username').val(), $('#message').val());
                $('#message').val('');
            }
        });

        // обработка логина
        $("#btnLogin").click(function () {

            var name = $("#txtUserName").val();
            if (name.length > 0) {
                chat.server.connect(name);
            }
            else {
                alert("Register or sign in to use chat");
            }
        });
    });
});

function clearTyping() {
    $('#typing').text("");
}

// Кодирование тегов
function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}
//Добавление нового пользователя
function AddUser(id, name) {

    var userId = $('#hdId').val();

    if (userId != id) {

        $("#chatusers").append('<p id="' + id + '"><b>' + name + '</b></p>');
    }
}

function angryClick() {
    $('#message').val($('#message').val()+"#angry");
}
function checkmarkClick() {
    $('#message').val($('#message').val() + "#checkmark");
}
function crossClick() {
    $('#message').val($('#message').val() + "#cross");
}
function grinClick() {
    $('#message').val($('#message').val() + "#grin");
}
function loveClick() {
    $('#message').val($('#message').val() + "#love");
}
function pointClick() {
    $('#message').val($('#message').val() + "#point");
}
function sadClick() {
    $('#message').val($('#message').val() + "#sad");
}
function smileClick() {
    $('#message').val($('#message').val() + "#smile");
}
function thumbsdownClick() {
    $('#message').val($('#message').val() + "#thumbsdown");
}
function thumbsupClick() {
    $('#message').val($('#message').val() + "#thumbsup");
}