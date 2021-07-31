const router = require('express').Router();
let Product = require('../models/product.model');
const {isAuth}=require('../util');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
})

const fileFilter = (req,file,cb) =>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
};
    const upload = multer({storage:storage,
        limits:{
            fileSize:1024 * 1024
        },
    fileFilter:fileFilter},
       );   


// Add New Product
router.post('/add',isAuth,upload.single('image'),async(req,res)=>{
    console.log(req.file);
    const name = req.body.name;
    const title = req.body.title;
    const description = req.body.description
    const images = req.file.path;
    const brand = req.body.brand;
    const price = req.body.price;
    const discounted_price = req.body.discounted_price;
    const category = req.body.category;
    const condition = req.body.condition;
    const countInStock = req.body.countInStock;
    

    // Add new product to the database
    const newProduct = new Product({name,title,description,images,brand,price,discounted_price,category,condition,countInStock})
    await newProduct.save();
    if(newProduct){
        res.status(201).send({message:"New Product Created",data:newProduct});

    }
    else{
        return res.status(500).send({ message: ' Error in Creating Product.' });
    }        
    
}

)

router.get("/",async(req,res)=>{
    const category = req.query.category?{category:req.query.category}:{};
    const searchKeyword = req.query.searchKeyword?{
        name:{
            $regex:req.query.searchKeyword,
            $options:'i',
        }
    }:{};
    const condition = req.query.condition?{condition:req.query.condition}:{};
    const sortOrder = req.query.sortOrder?
     req.query.sortOrder === 'Lowest'
      ? { price: -1 }
      : { price: 1 }
    : { _id: 1 };
    await Product.find({...category,...searchKeyword,...condition}).sort(sortOrder)
        .then((product)=>{
            res.status(200).send(product)
        })
        .catch((err)=>console.log("Error: " +err));
});

router.get("/:id", async(req,res)=>{
    const product_id = req.params.id;
    const product = await Product.findById(product_id);
    if(product){
        res.status(200).send(product)
    }
    else{
        res.status(400).send({msg:"Product cannot be found"});
    }

})

router.put("/update/:id",async(req,res)=>{
    const productId = req.params.id;
    const product = await Product.findById({_id:productId});
    if (product) {
        product.name = req.body.name;
        product.title = req.body.title;
        product.description = req.body.description;
        product.images = req.body.images;
        product.brand = req.body.brand;
        product.price = req.body.price;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;  
        product.condition = req.body.condition;
             
        const updatedProduct = await product.save();
        if (updatedProduct) {
          return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
        }
      }


})

router.delete('/delete/:id', async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
      await deletedProduct.remove();
      res.send({ message: 'Product Deleted' });
    } else {
      res.send('Error in Deleting.');
    }
  });




module.exports=router


