//khởi tạo server
const express = require('express'); //require module express
const app = new express();
const port = 3000; //khai báo cổng sẽ chạy server

//khai báo sử dụng ejs
app.set('view engine', 'ejs');
app.set('views', './views');

//router: tạo ra 2 trang, 1 là trang danh sách, 2 là trang tạo mới
app.get('/list/:id', (req,res,next) => {
    //req.params: nằm trong url
    //req.query: ngăn cách bằng dấu ?query1=x&query2=y
    //req.body
    res.render('list', 
        {
            idSp: req.params.id,
            nameSp: 'thaivm2',
        });
});

app.get('/create', (req,res,next) => {
    res.send('<h1>Đây là trang thêm mới</h1>');
})


app.listen(port, () => {
    console.log(`SV dang chay o port ${port}`);
})

