import React, {useState} from "react";
import { Layout } from 'antd';
import SiteHeader from "../Layout/header";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch } from "react-redux";
import { savePayment } from "../actions/cartAction";




const Payment = (props) =>{
    const {Footer,Content } = Layout;
    const [paymentMethod, setPaymentMethod] = useState('');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment({ paymentMethod }));
        props.history.push('/placeorder');
      };

    return(
        <Layout>
        <SiteHeader />
        
        <Content className="container">
             <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
            <div className="form">
            
                <form onSubmit={submitHandler}>
                    <ul className="form-contained">
                        <li>
                            <h2>Payment</h2>
                        </li>               

                        <li>
                        <div className="payment-radio">
                            <input
                            type="radio"
                            name="paymentMethod"
                            id="paymentMethod"
                            value="paystack"
                            onChange={(e) => setPaymentMethod(e.target.value)}                           
                            ></input>
                            <label for="paymentMethod">Paystack</label>
                        </div>

                        </li>

                  
                        <li>
                          <button type="submit" className="btn-sucess">Continue</button>
                         </li>

                    </ul>
                   
                </form>
            </div>
        </Content>
        
        <Footer className="footer"><p>Copyright 2021 All right reserved.</p></Footer>
    </Layout>
    )
}

export default Payment;


