const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({ 
    //khai báo các trường và kiểu dữ liệu ở trong bảng product
    name: {type: String},
    price: {type: Number},
    image: {type: String}
});

module.exports = mongoose.model('Product', productSchema);
