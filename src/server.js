const Koa = require('koa');
const path = require('path');
const app = new Koa();

const config = require('./config');

function start() {

    app.use(require('koa-static')(path.join(__dirname, '../static')));

    var server = require('http').createServer(app.callback());
    var io = require('socket.io')(server);
    io.on('connection', function (socket) {
        socket.emit('server say', { name: '展示功能' });
        socket.on('client say', (data) => {
            console.log(data);
        });
        socket.on('disconnect', (e) => {
            console.log(e);
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