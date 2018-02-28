const Koa = require('koa');
const app = new Koa();


function start() {
    app.use(async ctx => {
        ctx.body = 'Hello World';
    });

    app.listen(3000, () => {
        console.log('server is running at port 3000 ...');
    });
}

exports.start = start;