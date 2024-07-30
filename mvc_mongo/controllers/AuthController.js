const User = require('../models/UserModel');
const bcrypt = require('bcryptjs'); //mã hóa password

exports.register = async (req,res) => {
    try {
        //kiểm tra email đã tồn tại trong hệ thống hay chưa
        var existedEmail = await User.findOne({ email: req.body.email });
        if (existedEmail) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        var hashedPassword = await bcrypt.hash(req.body.password,10); //mã hóa password với bcrypt
        //lưu dữ liệu vào trong database
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        res.status(201).json({ 
            message: 'Đăng ký thành công' ,
            data: newUser,
        })
    } catch {
        res.status(400).json({ message: 'Error' });
    }
}

exports.login = async (req,res) => {

}