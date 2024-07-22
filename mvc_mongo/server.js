//khởi tạo server
const express = require('express'); //require module express
//từ express 4.16, ko cần require body-parser
// var bodyParser = require('body-parser'); //require body-parser
const mongoose = require('mongoose'); //kết nối với mongodb
const ProductController = require('./controllers/ProductController');
var multer = require('multer'); //multer để upload file ảnh

const app = new express();
const port = 3000; //khai báo cổng sẽ chạy server

//khai báo sử dụng ejs
app.set('view engine', 'ejs');
app.set('views', './views');
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true })); //từ express 4.16 trở đi

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images'); //khai báo đường dẫn thư mục lưu trữ file ảnh
    },
    filename: function (req, file, cb) { 
      cb(null, `${Date.now()}-${file.originalname}`); //lưu tên file kèm theo thời điểm upload
    }
})
const upload = multer({ storage: storage });

mongoose.connect('mongodb://127.0.0.1:27017/wd18411')
    .then(result => {
        app.get('/list', ProductController.getList);
        app.get('/create', ProductController.create);
        app.get('/edit/:id', ProductController.getDetail);
        app.post('/save',upload.single('image'), ProductController.save);
        app.post('/update/:id',upload.single('image'), ProductController.update);
        app.get('/delete/:id', ProductController.delete);
        app.listen(port, () => {
            console.log(`running in port ${port}`);
        })
    })
    .catch(err => {
        console.error(err);
    })