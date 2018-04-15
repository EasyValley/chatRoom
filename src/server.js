const Koa = require('koa');
const path = require('path');
const app = new Koa();

const config = require('./config');
const clients = [];


function start() {

    app.use(require('koa-static')(path.join(__dirname, '../static')));

    var server = require('http').createServer(app.callback());
    var io = require('socket.io')(server);
    io.on('connection', function (socket) {
        clients.push(socket);


        socket.on('chat message', (data) => {
            let username = '';
            if (socket.username && socket.username.trim() !== '') {
                username = socket.username.trim()
            } else {
                username = '匿名';
            }

            io.emit('chat message', {
                message: data,
                username
            });

        });

        socket.on('username', (data) => {
            socket.username = data;
            let arr = clients.map((item) => {
                let username = '';
                if (socket.username && socket.username.trim() !== '') {
                    username = socket.username.trim()
                } else {
                    username = '匿名';
                }

                return {
                    username
                };
            })

            io.emit('users', arr);

        });



        socket.on('disconnect', (e) => {
            clients.splice(clients.indexOf(socket), 1);


            console.log('客户端断开');
        });


    });

    server.listen(8090, () => {
        console.log(`server is running at port ${config.PORT}`);
    });

}

module.exports = {
    start
};