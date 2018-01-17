import * as express from 'express';
import {Server} from 'ws';

const app = express();

const wsServer = new Server({port: 8900});
wsServer.on('connection', websocket => {
    websocket.send(Math.random());   //向客户端推送消息
    websocket.on('message', message => {
        console.log('客户端向服务端推送消息' + message);
    })
});

setInterval(()=>{
    if(wsServer.clients){  // 是否有客户端连接着
        wsServer.clients.forEach(client=>{  // 也可以向指定的客户端推送消息
            client.send(Math.random());   // 定时推送
        })
    }
},1000);
app.listen('4000');
