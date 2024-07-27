const Product = require('../models/ProductModel');

//lấy danh sách 
exports.getList = async (req,res) => {
    try {
        var products = await Product.find(); //hàm find để lấy danh sách bản ghi
        res.render('list', { pros: products }) //đổ dữ liệu sang giao diện
    } catch (err) {
        console.error(err);
    }
}

//lấy thông tin chi tiết
exports.getDetail = async (req,res) => {
    var id = req.params.id;
    var product = await Product.findById(id);

    res.render('edit', { product });
}

//điều hướng sang form tạo mới
exports.create = (req,res) => {
    res.render('create');
}

//lưu dữ liệu mới vào db
exports.save = async (req,res) => {
    //B1: lấy dữ liệu ng dùng nhập vào form
    var newProduct = {
        name: req.body.name,
        price: req.body.price,
        image: req.file.filename
    }
    //B2: đẩy dữ liệu lên sv
    var product = await 
        Product.create(newProduct);
    if (product) {
        console.log('create successfully');
        res.redirect('/list');
    }
}

//hàm cập nhật
exports.update = async (req,res) => {
    var id = req.params.id;
    //B1: lấy dữ liệu ng dùng nhập vào form
    var updatedProduct = {
        name: req.body.name,
        price: req.body.price,
        image: req.file.filename
    }
    //B2: đẩy dữ liệu lên sv
    var product = await 
        Product.findByIdAndUpdate(id, updatedProduct);
    if (product) {
        console.log('update successfully');
        res.redirect('/list');
    }
}

//hàm xóa
exports.delete = async (req,res) => {
    var id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.redirect('/list');
}


// xử lý API
exports.apiGetList = async (req,res) => {
    try {
        var products = await Product.find();
        res.status(200).json({ data: products });
    } catch (errors) {
        res.status(400).json({ error: errors });
    }
}


exports.apiDetail = async (req,res) => {
    try {
        var product = await Product.findById(req.params.id);
        res.status(200).json({ data: product })
    } catch {
        res.status(400).json({ message: 'Something went wrong'});
    }
}

exports.apiCreate = async (req,res) => {
    try {
        //B1: lấy data ng dùng nhập vào form
        var newProduct = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.file.filename
        }
        //B2: lưu data vào trong db
        var product = await Product.create(newProduct);
        if (product) {
            res.status(200).json({ message: 'Create successfully', data: product })
        }
    } catch {
        res.status(400).json({ message: 'Something went wrong'});
    }
}

exports.apiUpdate = async (req,res) => {
    try {
        //B1: lấy data ng dùng nhập vào form
        var updateProduct = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.file.filename
        }
        await Product.findByIdAndUpdate(req.params.id, updateProduct);
        res.status(200).json({ message: 'Update successfully'});
    } catch {
        res.status(400).json({ message: 'Something went wrong'});
    }
}

exports.apiDelete = async (req,res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Delete successfully'})
    } catch {
        res.status(400).json({ message: 'Something went wrong'});
    }
}
