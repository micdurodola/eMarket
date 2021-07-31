const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());



/**** Connect database uri */
const URI = process.env.DATABASE_URI;

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});
const connection = mongoose.connection;

connection.once('open',()=>{
    console.log('Database connection was succesful');
}) 

/**** Specify listening port */
const port = process.env.PORT ? process.env.PORT : 5000;

/**** Connect backend Routes */

const authRouter = require('./routes/auth');
const productRouter = require('./routes/products');
const userRouter = require('./routes/users');
const orderRouter = require('./routes/orders');


app.use('/api/v1/user',userRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/product',productRouter);
app.use('/api/v1/order',orderRouter);


app.use(function (err, req, res, next) {
    console.log('This is the invalid field ->', err.field)
    next(err)
  })

app.use('/uploads',express.static('uploads'));
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});


app.listen(port, ()=>{
    console.log(`App is listening at PORT: ${port}`)
})
