const Koa = require('koa');
const staticServer = require('koa-static');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');

const app = new Koa();


function start() {
    // app.use(staticServer(path.join(__dirname, '../dist')));
    app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }));
    app.use(async (ctx) => {


        let headers = ctx.request.headers;

        const options = {
            hostname: '127.0.0.1',
            port: 9000,
            path: ctx.request.url,
            method: ctx.request.method,
            headers: headers
        };




        let re = await new Promise((resolve, reject) => {
            const req = http.request(options, (res) => {
                resolve(res);

            });
            let postData = ctx.request.body;
            let str;
            if (typeof postData === 'object') {
                str = querystring.stringify(postData);
            } else {
                str = (postData || '').toString();
            }
            
            req.write(str);
            req.end();

            req.on('error', err => {
                resolve(err);

            });


        });

        let resHeaders = re.headers;
        ctx.set(resHeaders);
        ctx.response.body = re;

    })

    app.listen(3000, () => {
        console.log('serveddr is running at port 3000 ...');
    });
    app.on('error', (err) => {
        console.log(err);
    })
}

exports.start = start;