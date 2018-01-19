import * as express from 'express';
import * as path from 'path';
import {Server} from 'ws'

const app = express();

export class Product {
    constructor(public id: number,
                public name: string,
                public price: number,
                public stars: number,
                public desc: string,
                public types: Array<string>) {
    }
}

export class Comment {
    constructor(public id: number,   // 用户id
                public userName: string, // 用户名字
                public productId: number,
                public timeStamp: string,
                public rating: number,
                public content: string) {
    }
}

const comments: Comment[] = [
    new Comment(1, '张三', 1, '2017-02-02 22:22:22', 2, '产品很好'),
    new Comment(2, '李四', 1, '2017-03-02 22:22:22', 3, '产品质量好'),
    new Comment(3, '王五', 1, '2017-04-02 22:22:22', 4, '产品可以'),
    new Comment(4, '空心', 1, '2017-05-02 22:22:22', 4.5, '产品还好'),
    new Comment(5, '钟馗', 2, '2017-06-02 22:22:22', 5, '产品相当好'),
];

const products: Product[] = [
    new Product(1, '第一个商品', 1, 1.5, '这是第一个商品描述', ['电子产品', '硬件设备']),
    new Product(2, '第二个商品', 2, 2.5, '这是第二个商品描述', ['图书']),
    new Product(3, '第三个商品', 3, 3.5, '这是第三个商品描述', ['水果', '食品']),
    new Product(4, '第四个商品', 4, 4.5, '这是第四个商品描述', ['膨化食品', '食品']),
    new Product(5, '第五个商品', 5, 5, '这是第五个商品描述', ['家用家具', '生活用品']),
];


/*app.get('/', (req, res) => {
    res.send('hello express');
});*/
app.use('/',express.static(path.join(__dirname,'..','client')));

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/product/:id', (req, res) => {
    res.json(products.find(product =>
        product.id = req.params.id
    ));
});

app.get('/api/product/:id/comments', (req, res) => {
    res.json(comments.filter(comment => comment.productId == req.params.Id));
});

app.get('/api/searchProducts', function (req, res) {
    let result = products;
    const params = req.query;
    if (params.productTitle) {
        result = result.filter(product => product.name.indexOf(params.productTitle) != -1);
    }
    if (params.productPrice && result.length > 0) {
        result = result.filter(product => product.price <= parseInt(params.productPrice));
    }
    if (params.productType != -1 && result.length > 0) {
        result = result.filter(product => product.types.indexOf(params.productType) != -1);
    }
    res.json(result);
});

// es6 Map 对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值。
const wsServer = new Server({port: 9000});
// 每个用户关注的商品  第一个参数为websocket,第二个参数为关注的商品id数组集合
let clientWatchProductNumber = new Map<any, number[]>();
wsServer.on('connection', websocket => {
    websocket.on('message', (messages) => {
        if (typeof messages == 'string') {
            var params = JSON.parse(messages);
        }
        let productIds = clientWatchProductNumber.get(websocket) || [];
        clientWatchProductNumber.set(websocket, [...productIds, params.productId]);
    })
});
let currentBid = new Map<number, number>();  // 最新出价  商品id,商品最新报价
setInterval(() => {
    products.forEach(product => {
        let currentBin = currentBid.get(product.id) || product.id;
        let newBid = currentBin + Math.random() * 5;
        currentBid.set(product.id, newBid);
    });
    clientWatchProductNumber.forEach((productIds: number[], ws) => {  //value,ws
        console.log(ws.readyState);
        if (ws.readyState == 1) {  // 客户端连接状态
            let newBinds = productIds.map(pid => ({
                productId: pid,
                bid: currentBid.get(pid)
            }));  // 数组
            ws.send(JSON.stringify(newBinds));
        } else {
            console.log('客户端断开状态：'+ JSON.stringify(clientWatchProductNumber));
            clientWatchProductNumber.delete(ws);  // 删除该客户端
        }
    })
}, 2000);

app.listen('8000', () => {
    console.log('server running in port:8000');
});


