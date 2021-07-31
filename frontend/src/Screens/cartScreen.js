import React,{useEffect} from "react";
import {Link} from "react-router-dom";
import { Layout} from 'antd';
import SiteHeader from "../Layout/header";
import { useDispatch, useSelector } from "react-redux";
import { addToCart,removeFromCart } from "../actions/cartAction";

const Cart = (props) =>{
  const cart = useSelector((state)=>state.cart);
  const{cartItems} = cart;
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }

  const handleCheckout =()=>{
    props.history.push("/login?redirect=shipping");
  }


  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

    const { Footer,Content } = Layout;
    return(
        <Layout>
        <SiteHeader/>
       <Content className="cart-content">
           <div className="cart">
               <div className="cart-list">
               <ul className="cart-list-container">
                   <li><h3><b>Shopping Cart</b></h3>
                   <div>Price</div>
                   </li>
                   {cartItems.length===0?
                     <div>Cart is empty</div>:
                     cartItems.map(item=>
                      <li>
                         <div className="cart-image">
                        <img src={`/${item.image}`} alt="product" />
                    </div>
                    <div className="cart-name">
                  <div>
                    <Link to="/product/1">
                      {item.name}
                    </Link>

                  </div>
                  <div>
                    Qty:<select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                      {[...Array(item.countInStock).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
                    </select>

                    <button type="button" className="button" onClick={()=>removeFromCartHandler(item.product)} >
                    Delete
                    </button>
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
               <div className="cart-action">
                    <h3>  Subtotal: $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}  </h3>                                        
                    
                <button  className="btn-sucess"
                onClick={handleCheckout} disabled={cartItems.length === 0} >
                    Proceed to Checkout
                </button>
               </div>

            </div>        

       </Content>
       <Footer className="footer"><p>Copyright 2021 All right reserved.</p></Footer>
     </Layout>

    )
}

export default Cart;