import React, { useEffect } from 'react';
import { Layout} from 'antd';
import SiteHeader from "../Layout/header";
import { useDispatch, useSelector } from 'react-redux';
import {listMyOrders} from '../actions/orderAction';



const Dashboard = ()=>{   

const {  Content, Footer } = Layout;
const myOrderList = useSelector((state)=>state.myOrderList);
const{loading,orders,error} =  myOrderList;

const dispatch = useDispatch();
 useEffect(()=>{
   dispatch(listMyOrders());

 },[])


    return(
        <Layout>
        <SiteHeader/>
        <Content className="container">
                <div className="dashboard-table">
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Amount</th>
                                    <th>Payment Method</th>
                                    <th>Shipping Address</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                </tr>
                            </thead>
                            <tbody>
                              {loading? <div>Loading...</div>:
                              error? <div>{error}</div>:
                              orders.map((order)=>(
                                <tr key={order.user}>
                                <td>{order._id}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.payment.paymentMethod}</td>
                                <td>{order.shipping.address}</td>
                                <td>{order.isPaid.toString()}</td>
                                <td>{order.isDelivered.toString()}</td>
                            </tr>  

                              ))}
                               
                                               
                            
                            </tbody>
                        </table>
                </div>
                
                </Content>
   
                <Footer className="footer"><p>Copyright 2021 All right reserved.</p></Footer>
      </Layout>
    );
}

export default Dashboard;






