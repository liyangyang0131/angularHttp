import * as express from 'express';

const app = express();

export class Product{
    constructor(
        public id:number,
        public name:string,
        public price:number,
        public stars:number,
        public desc:string,
        public types:Array<string>
    ){}
}

const products:Product[] = [
    new Product(1,'第一个商品',1,1.5,'这是第一个商品描述',['电子产品', '硬件设备']),
    new Product(2,'第二个商品',2,2.5,'这是第二个商品描述',['图书']),
    new Product(3,'第三个商品',3,3.5,'这是第三个商品描述',['水果']),
    new Product(4,'第四个商品',4,4.5,'这是第四个商品描述',['膨化食品']),
    new Product(5,'第五个商品',5,5,'这是第五个商品描述',['家用家具', '生活用品']),
];


app.get('/',(req,res)=>{
    res.send('hello express');
});

app.get('/api/products',(req,res)=>{
    res.json(products);
});

app.get('/api/product/:id',(req,res)=>{
    res.json(products.find(product=>
        product.id = req.params.id
    ));
});

app.listen('8000');


