var socket = io();
socket.on('connect', function () {

});

socket.on('disconnect', function () {

});



var app = new Vue({
    el: '#app',
    data: function () {
        return {
            messages: [],
            myMessage: '',
            username: ''
        };
    },
    mounted: function () {
        var that = this;
        socket.on('chat message', function (data) {
            that.getMessages(data);
        });
        socket.on('users', function (data) {
            console.log(data);

        })

    },
    methods: {

        doSend: function () {

            socket.emit('chat message', this.myMessage)
        },
        getMessages: function (data) {
            this.messages.push(data);
        },
        doSendUsername: function () {
            socket.emit('username', this.username)


            var div = document.createElement('div');
            div.className = "username-alert";
            div.innerHTML = '用户名设置成功！';
            document.body.appendChild(div);
            setTimeout(function () {
                document.body.removeChild(div);
            }, 500);
        }
    }

});







