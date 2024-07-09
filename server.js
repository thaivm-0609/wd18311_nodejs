//khởi tạo server
const express = require('express'); //require module express
//từ express 4.16, ko cần require body-parser
// var bodyParser = require('body-parser'); //require body-parser
var multer = require('multer'); //require multer
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
    res.render('list', { pros: products });
});

app.get('/create', (req,res,next) => {
    res.render('create');
})

//router upload file ảnh
app.post('/upload', upload.single('img'), (req,res) => {

})

app.post('/save', (req,res) => {
    //lấy giá trị a,b,c người dùng nhập qua form
    var a = req.body.a;
    var b = req.body.b;
    var c = req.body.c;

    if (a == 0) {
        if (b == 0) {
            if (c == 0) {
                res.send('PT có vô số nghiệm');
            } else {
                res.send('PT vô nghiệm');
            }
        } else {
            res.send(`PT có 1 nghiệm là x = ${-c/b}`)
        }
    } else {
        var delta = b*b-4*a*c;
        if (delta < 0) {
            res.send('PT vô nghiệm');
        } else if (delta == 0) {
            res.send(`PT có 2 nghiệm kép x1=x2=${-b/(2*a)}`);
        } else {
            var x1= (-b - Math.sqrt(delta))/(2*a);
            var x2= (-b + Math.sqrt(delta))/(2*a);
            res.send(`PT có 2 nghiệm phân biệt x1=${x1} và x2=${x2}`);
        }
    }
})

app.listen(port, () => {
    console.log(`SV dang chay o port ${port}`);
})

