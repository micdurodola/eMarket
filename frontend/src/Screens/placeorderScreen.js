import React,{useEffect} from "react";
import { Layout } from 'antd';
import SiteHeader from "../Layout/header";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderAction";



const PlaceOrder = (props) =>{

  const { Footer,Content } = Layout;

  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  
  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }

  const itemPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const itemsPrice = (Math.round(itemPrice * 100) / 100);
  const shippingPrice = itemsPrice > 40000 ? 0 : 1000;
  const taxsPrice = 0.15 * itemsPrice;
  const taxPrice = (Math.round(taxsPrice * 100) / 100);
  const totalsPrice = itemsPrice + shippingPrice + taxPrice;
  const totalPrice = (Math.round(totalsPrice * 100) / 100);

  const dispatch= useDispatch();

  const placeOrderHandler = () => {
    // create an order
    dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
      taxPrice, totalPrice
    }));
  }

  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }

  }, [success]);

  
    return(
        <Layout>
        <SiteHeader />
        
        <Content className="container">
        <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>        
        <div className="placeorder">
            <div className="placeorder-info">
                <div>
                    <h3>Shipping</h3>
                    <div>
                    {cart.shipping.address}, {cart.shipping.city},
                    {cart.shipping.phoneNumber}, {cart.shipping.state},
                    </div>
                </div>
                <div>
                     <h3>Payment</h3>
                     <div>
                      Payment Method: {cart.payment.paymentMethod}
                    </div>
                   
                </div>
                <div>
          <ul className="cart-list-container">
            <li>
              <h3>
                Shopping Cart
          </h3>
              <div>
                Price
          </div>
            </li>
            {
              cartItems.length === 0 ?
                <div>
                  Cart is empty
          </div>
                :
                cartItems.map(item =>
                  <li>
                    <div className="cart-image">
                      <img src={`/${item.image}`} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>
                          {item.name}
                        </Link>

                      </div>
                      <div>
                        Qty: {item.qty}
                      </div>
                    </div>
                    <div className="cart-price">
                      ${item.price}
                    </div>
                  </li>
                )
            }
          </ul>
        </div>

       
        </div>
            
              <div className="placeorder-action">
                <ul>
                    <li >  
                      <button type="submit" onClick={placeOrderHandler} className="button primary">Place Order</button>         
                      
                    </li>
                    <li>
                      <h3>Order Summary</h3>
                    </li>
                    <li>
                      <div>Items</div>
                      <div>${itemsPrice}</div>
                    </li>
                    <li>
                      <div>Shipping</div>
                      <div>${shippingPrice}</div>
                    </li>
                    <li>
                      <div>Tax</div>
                      <div>${taxPrice}</div>
                    </li>
                    <li>
                      <div>Order Total</div>
                      <div>${totalPrice}</div>
                    </li>
                </ul>

              </div>
        </div>
             
        </Content>
        
        <Footer className="footer"><p>Copyright 2021 All right reserved.</p></Footer>
    </Layout>
    )
}

export default PlaceOrder;


