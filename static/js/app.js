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
            myMessage:''
        };
    },
    mounted: function () {
        var that = this;
        socket.on('chat message', function (data) {
            that.getMessages(data);
        });
    },
    methods: {

        doSend: function () {

            socket.emit('chat message', this.myMessage)
        },
        getMessages: function (data) {
            this.messages.push(data);
        }
    }

});







