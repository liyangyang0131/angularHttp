"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
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
var products = [
    new Product(1, '第一个商品', 1, 1.5, '这是第一个商品描述', ['电子产品', '硬件设备']),
    new Product(2, '第二个商品', 2, 2.5, '这是第二个商品描述', ['图书']),
    new Product(3, '第三个商品', 3, 3.5, '这是第三个商品描述', ['水果']),
    new Product(4, '第四个商品', 4, 4.5, '这是第四个商品描述', ['膨化食品']),
    new Product(5, '第五个商品', 5, 5, '这是第五个商品描述', ['家用家具', '生活用品']),
];
app.get('/', function (req, res) {
    res.send('hello express');
});
app.get('/products', function (req, res) {
    res.json(products);
});
app.get('/product/:id', function (req, res) {
    res.json(products.find(function (product) {
        return product.id = req.params.id;
    }));
});
app.listen('9000');
//# sourceMappingURL=auction.js.map