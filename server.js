//khởi tạo server
const express = require('express'); //require module express
const app = new express();
const port = 3000; //khai báo cổng sẽ chạy server

//khai báo sử dụng ejs
app.set('view engine', 'ejs');
app.set('views', './views');

//router: tạo ra 2 trang, 1 là trang danh sách, 2 là trang tạo mới
app.get('/list', (req,res,next) => {
    //req.params: nằm trong url
    //req.query: ngăn cách bằng dấu ?query1=x&query2=y
    //req.body
    let products = [
        {
            id: 1,
            name: 'thaivm2',
            price: 100000,
            images: 'https://picsum.photos/100'
        },
        {
            id: 2,
            name: 'thaivm22',
            price: 300000,
            images: 'https://picsum.photos/100'
        },
        {
            id: 3,
            name: 'thaivm23',
            price: 200000,
            images: 'https://picsum.photos/100'
        }
    ];
    res.render('list', { pros:products });
});

app.get('/create', (req,res,next) => {
    res.send('<h1>Đây là trang thêm mới</h1>');
})


app.listen(port, () => {
    console.log(`SV dang chay o port ${port}`);
})

