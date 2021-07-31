const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    name:{type:String},
    title: {type:String},
    description:{type:String},
    images:{type:String},
    brand:{type:String},
    price:{type:Number},
    discounted_price:{type:Number},
    category:{type:String},
    countInStock:{type:Number, default:0},
    condition:{type:String}},
    {timestamps:true}

);

const Product = mongoose.model("products", productSchema);
module.exports = Product;