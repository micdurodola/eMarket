import React,{useEffect} from "react";
import { Layout } from 'antd';
import SiteHeader from "../Layout/header";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { detailsOrder, payOrder } from "../actions/orderAction";
import { PaystackButton } from 'react-paystack';



const OrderScreen = (props) =>{

  const { Footer,Content } = Layout;  
  const dispatch= useDispatch();

  const orderDetail = useSelector((state)=>state.orderDetails);
  const{loading,error,order} = orderDetail;
  const orderPay = useSelector((state)=>state.orderPay);
  const{loading:loadingPay,success:successPay,error:errorPay} = orderPay;
  const userSignin = useSelector((state) => state.userSignin);
  const cart = useSelector(state => state.cart);
  const { cartItems} = cart;
  const { userInfo } = userSignin;
  const{email,_id} = userInfo;

  const itemPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const itemsPrice = (Math.round(itemPrice * 100) / 100);
  const shippingPrice = itemsPrice > 40000 ? 0 : 1000;
  const taxsPrice = 0.15 * itemsPrice;
  const taxPrice = (Math.round(taxsPrice * 100) / 100);
  const totalsPrice = itemsPrice + shippingPrice + taxPrice;
  const totalPrice = ((Math.round(totalsPrice * 100) / 100)*100); 
  

  useEffect(() => {
    if (successPay) {
      props.history.push('/user-dashboard/');
     
    } else {
      dispatch(detailsOrder(props.match.params.id));
      console.log(detailsOrder);      
      
    }
    return () => {
    };
  }, [successPay]);

  const amount =parseInt(totalPrice);
  const publicKey=process.env.REACT_APP_PAYSTACK_KEY;
  
  const handleSuccessPayment=(paymentResult)=>{
    dispatch(payOrder(order,paymentResult));

}

  const componentProps = {
    email,
    amount,      
    publicKey,
    text: "Pay Now",
    onSuccess:  handleSuccessPayment
    
  }

    



    return(
        <Layout>
        <SiteHeader />
        
        <Content className="container">
        
        <>
        <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>  
          
        <div className="placeorder">
            {loading? (<div>Loading....</div>):
            error? (<div>{error}</div>):(
                <>
                <div className="placeorder-info">
                <div>
                    <h3>Shipping</h3>
                    <div>                                      
                      {order.shipping.address}, {order.shipping.city},
                      {order.shipping.phoneNumber}, {order.shipping.state}
                    </div>
                    <div>
                    {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
                    </div>
                </div>
                <div>
                     <h3>Payment</h3>
                     <div>
                     Payment Method: {order.payment.paymentMethod}
                    </div>
                    <div>
                    {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
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
            {order.orderItems.map(item=>(
                  <li key={item._id}>
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

            ))}
          
           
          </ul>
        </div>

       
        </div>
            
              <div className="placeorder-action">
                <ul>
                    <li >  
                    {loadingPay && <div>Finishing Payment...</div>}
                    {!order.isPaid && order.payment.paymentMethod ==='flutterwave'?
                    <button>Flutterwave</button>:
                    <PaystackButton                    
                    className="paystack-button" {...componentProps}
                    onSuccess={handleSuccessPayment}  />                  
              }                              
                      
                    </li>
                    <li>
                      <h3>Order Summary</h3>
                    </li>
                    <li>
                      <div>Items</div>
                      <div>${order.itemsPrice}</div>
                    </li>
                    <li>
                      <div>Shipping</div>
                      <div>${order.shippingPrice}</div>
                    </li>
                    <li>
                      <div>Tax</div>
                      <div>${order.taxPrice}</div>
                    </li>
                    <li>
                      <div>Order Total</div>
                      <div>${order.totalPrice}</div>
                    </li>
                    <li>
               

                    </li>
                </ul>


              </div>
            </>
            )

            }
       
            
        </div>
      
        </>             
        </Content>
        
        <Footer className="footer"><p>Copyright 2021 All right reserved.</p></Footer>
    </Layout>
    )
}

export default OrderScreen;


