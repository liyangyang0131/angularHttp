"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ws_1 = require("ws");
var app = express();
var wsServer = new ws_1.Server({ port: 8900 });
wsServer.on('connection', function (websocket) {
    websocket.send(Math.random()); //向客户端推送消息
    websocket.on('message', function (message) {
        console.log('客户端向服务端推送消息' + message);
    });
});
setInterval(function () {
    if (wsServer.clients) {
        wsServer.clients.forEach(function (client) {
            client.send(Math.random()); // 定时推送
        });
    }
}, 1000);
app.listen('4000');
//# sourceMappingURL=webSocket.js.map