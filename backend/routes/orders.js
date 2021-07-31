const router = require('express').Router();
let Order = require('../models/order.model');
const {isAuth} = require('../util');


// List of all orders

router.get("/all", isAuth, async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

// Customer's Orders

router.get("/customer", isAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

router.get("/:id", isAuth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Order Not Found.")
  }
});


router.post("/create",isAuth, async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });
    const newOrderCreated = await newOrder.save();
    if(newOrderCreated){
        res.status(201).send({ message: "New Order Created", data: newOrderCreated });
    }
    else{
        res.status(401).send({msg:"Unable to create a new order"});
    }
    
  });

router.get("/user/:id",isAuth,async(req,res)=>{
  const userId = req.params.id;
    const order = await Order.findById(userId);
  if(order){
    res.status(200).send(order);
  }
  else{
    res.status(400).json('Order not found');
  }  

});

router.put("/:id/pay", isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: 'paystack',
      paymentResult: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID
      }
    }
    const updatedOrder = await order.save();
    res.send({ message: 'Order Paid.', order: updatedOrder });
  } else {
    res.status(404).send({ message: 'Order not found.' })
  }
});








module.exports=router;