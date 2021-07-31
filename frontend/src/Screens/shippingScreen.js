import React,{useState} from "react";
import { Layout } from 'antd';
import SiteHeader from "../Layout/header";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch } from "react-redux";
import { saveShipping } from "../actions/cartAction";



const Shipping = (props) =>{
    const { Footer,Content } = Layout
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [state, setState] = useState('');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({ address, city, phoneNumber, state }));
        props.history.push('payment');
      }



    return(
        <Layout>
        <SiteHeader />
        
        <Content className="container">
             <CheckoutSteps step1 step2 ></CheckoutSteps>
            <div className="form">
            
                <form onSubmit={submitHandler}>
                    <ul className="form-contained">
                        <li>
                            <h2>Shipping</h2>
                        </li>                     
                     
                        <li>
                            <label htmlFor="address">Address</label>
                            <input placeholder="Shipping Address" onChange={(e)=>setAddress(e.target.value)}/>
                        </li>

                        <li>
                            <label htmlFor="city">City</label>
                            <input placeholder="City" onChange={(e)=>setCity(e.target.value)}/>
                        </li>
                        <li>
                            <label htmlFor="city">Phone Number</label>
                            <input placeholder="Phone Number" onChange={(e)=>setPhoneNumber(e.target.value)}/>
                        </li>

                        <li>
                            <label htmlFor="state">State</label>
                            <input placeholder="State" onChange={(e)=>setState(e.target.value)} />

                        </li>
                        <li>
                          <button type="submit" className="btn-success">Continue</button>
                         </li>

                    </ul>
                   
                </form>
            </div>
        </Content>
        
        <Footer className="footer"><p>Copyright 2021 All right reserved.</p></Footer>
    </Layout>
    )
}

export default Shipping;


