import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import { Layout,Badge} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import { ShoppingCartOutlined } from '@ant-design/icons';  
import { signout } from "../actions/userAction";
import logo from '../images/logo/white-logo.png';
import { withRouter} from 'react-router-dom';




const SiteHeader = (props)=>{
    const { Header} = Layout;  
    const [query,setQuery]= useState("") 

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch= useDispatch();

    const logout = ()=>{
        dispatch(signout());
    }

    const cart = useSelector((state)=>state.cart);
    const{cartItems} = cart;
    const count =  cartItems.reduce((a, c) => a + c.qty, 0);

    const handleSearch = (e) =>{
        e.preventDefault();
        props.history.push("/search/s" + "?query=" + query);
    }
    

    return(

   <Header>
       <nav>
       <div className="brand">
       <Link to="/"><img src={logo} className="brand"/></Link> 
       </div>
       
            <div className="search">
                <form style={{display:'flex',width:'100%'}} onSubmit={handleSearch}>
                <input type="text" className="searchTerm" onChange={(e)=>setQuery(e.target.value)} 
                placeholder="Search for product" />
                <button type="submit" className="searchButton">
                <SearchOutlined />                    
                </button>
                </form>
            </div>

       <ul className="menu">
            
            {userInfo ? (
                <div className="menu">
                    <li>
                    <Badge count={count}>
                        <ShoppingCartOutlined className="cart-icon" />
                    </Badge>              

                  </li>
                <li>
                    
                    <Link to="/user-dashboard">{userInfo.email}</Link>
              </li>
            
              <li>
              <a href="/" onClick={logout}>Sign out</a>
              </li>
              </div>
            ) : (
                
            <div className="menu"> 
                   <li>
                    <Badge count={0}>
                        <ShoppingCartOutlined className="cart-icon" />
                    </Badge>            

                  </li>           
                <li> <Link to="/login">Login </Link></li>                    
                <li><a href="/register" >Sign up</a></li>
            </div>             
             
            )}
           
       </ul>
    </nav>
   </Header>     

);
}

export default withRouter (SiteHeader);


        // {userInfo ? (  
        //    <div className="menu">    
            
        //         <li>               
        //             <Badge count={count}>
        //                 <ShoppingCartOutlined className="cart-icon" />
        //             </Badge> 
        //          </li>
               
        //         <li>
        //         <Link to="/dashboard">{userInfo.email}</Link>
        //         </li>          
                
        //         <li><a href="/" onClick={logout}>Sign out</a></li>
        //         </div>  
                
                
        //      ):
        //        (
        //         <div className="menu"> 
        //         <li>
        //         <Badge count={0}>
        //             <ShoppingCartOutlined className="cart-icon" />
        //             </Badge>               

        //          </li>
        //         <li>
        //             <Link to="/login">Login </Link>
        //         </li>
        //         <li><a href="/register" >Sign up</a></li>
        //     </div> 
            
                
        //     )}