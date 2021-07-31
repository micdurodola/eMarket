const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shippingSchema = {
    address: { type: String, required: true },
    city: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    state: { type: String, required: true },
  };

  const paymentSchema = {
    paymentMethod: { type: String, required: true }
  };


const orderItemSchema = new Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    image: { type: String,},
    price: { type: String, required: true },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
  });

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [orderItemSchema],
    shipping: shippingSchema,
    payment: paymentSchema,
    itemsPrice: { type: Number },
    taxPrice: { type: Number },
    shippingPrice: { type: Number },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    }, {
    timestamps: true
});

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;