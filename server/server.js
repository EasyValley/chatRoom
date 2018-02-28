const Koa = require('koa');
const app = new Koa();


function start() {
    app.use(async ctx => {
        ctx.body = 'Hello World nice to meet you';
    });

    app.listen(3000, () => {
        console.log('serveddr is running at port 3000 ...');
    });
}

exports.start = start;