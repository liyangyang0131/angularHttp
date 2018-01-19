"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var ws_1 = require("ws");
var app = express();
var Product = (function () {
    function Product(id, name, price, stars, desc, types) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stars = stars;
        this.desc = desc;
        this.types = types;
    }
    return Product;
}());
exports.Product = Product;
var Comment = (function () {
    function Comment(id, // 用户id
        userName, // 用户名字
        productId, timeStamp, rating, content) {
        this.id = id;
        this.userName = userName;
        this.productId = productId;
        this.timeStamp = timeStamp;
        this.rating = rating;
        this.content = content;
    }
    return Comment;
}());
exports.Comment = Comment;
var comments = [
    new Comment(1, '张三', 1, '2017-02-02 22:22:22', 2, '产品很好'),
    new Comment(2, '李四', 1, '2017-03-02 22:22:22', 3, '产品质量好'),
    new Comment(3, '王五', 1, '2017-04-02 22:22:22', 4, '产品可以'),
    new Comment(4, '空心', 1, '2017-05-02 22:22:22', 4.5, '产品还好'),
    new Comment(5, '钟馗', 2, '2017-06-02 22:22:22', 5, '产品相当好'),
];
var products = [
    new Product(1, '第一个商品', 1, 1.5, '这是第一个商品描述', ['电子产品', '硬件设备']),
    new Product(2, '第二个商品', 2, 2.5, '这是第二个商品描述', ['图书']),
    new Product(3, '第三个商品', 3, 3.5, '这是第三个商品描述', ['水果', '食品']),
    new Product(4, '第四个商品', 4, 4.5, '这是第四个商品描述', ['膨化食品', '食品']),
    new Product(5, '第五个商品', 5, 5, '这是第五个商品描述', ['家用家具', '生活用品']),
];
/*app.get('/', (req, res) => {
    res.send('hello express');
});*/
app.use('/', express.static(path.join(__dirname, '..', 'client')));
app.get('/api/products', function (req, res) {
    res.json(products);
});
app.get('/api/product/:id', function (req, res) {
    res.json(products.find(function (product) {
        return product.id = req.params.id;
    }));
});
app.get('/api/product/:id/comments', function (req, res) {
    res.json(comments.filter(function (comment) { return comment.productId == req.params.Id; }));
});
app.get('/api/searchProducts', function (req, res) {
    var result = products;
    var params = req.query;
    if (params.productTitle) {
        result = result.filter(function (product) { return product.name.indexOf(params.productTitle) != -1; });
    }
    if (params.productPrice && result.length > 0) {
        result = result.filter(function (product) { return product.price <= parseInt(params.productPrice); });
    }
    if (params.productType != -1 && result.length > 0) {
        result = result.filter(function (product) { return product.types.indexOf(params.productType) != -1; });
    }
    res.json(result);
});
// es6 Map 对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值。
var wsServer = new ws_1.Server({ port: 9000 });
// 每个用户关注的商品  第一个参数为websocket,第二个参数为关注的商品id数组集合
var clientWatchProductNumber = new Map();
wsServer.on('connection', function (websocket) {
    websocket.on('message', function (messages) {
        if (typeof messages == 'string') {
            var params = JSON.parse(messages);
        }
        var productIds = clientWatchProductNumber.get(websocket) || [];
        clientWatchProductNumber.set(websocket, productIds.concat([params.productId]));
    });
});
var currentBid = new Map(); // 最新出价  商品id,商品最新报价
setInterval(function () {
    products.forEach(function (product) {
        var currentBin = currentBid.get(product.id) || product.id;
        var newBid = currentBin + Math.random() * 5;
        currentBid.set(product.id, newBid);
    });
    clientWatchProductNumber.forEach(function (productIds, ws) {
        console.log(ws.readyState);
        if (ws.readyState == 1) {
            var newBinds = productIds.map(function (pid) { return ({
                productId: pid,
                bid: currentBid.get(pid)
            }); }); // 数组
            ws.send(JSON.stringify(newBinds));
        }
        else {
            console.log('客户端断开状态：' + JSON.stringify(clientWatchProductNumber));
            clientWatchProductNumber.delete(ws); // 删除该客户端
        }
    });
}, 2000);
app.listen('8000', function () {
    console.log('server running in port:8000');
});
//# sourceMappingURL=auction.js.map