import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Layout } from 'antd';
import SiteHeader from "../Layout/header";
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from "../actions/productAction";

const Search = (props)=>{
    const {Footer,Content } = Layout;
    const searchKeyword = props.location.search? props.location.search.split("=")[1]:"";
    const productList = useSelector((state)=>state.productList);
    const{loading,products,error} = productList;
    const dispatch = useDispatch();

    const [condition, setCondition]= useState("");
    const [sortOrder, setSortOrder]= useState("");


    const category="";  


    useEffect(()=>{
        dispatch(listProducts(category,searchKeyword,condition,sortOrder));
        console.log(searchKeyword);
        console.log(condition)
      },[category,searchKeyword,condition,sortOrder]);

      const handleFilter = (e) =>{  
        //   e.preventDefault();        
        setCondition(e.target.value);
        dispatch(listProducts(category,searchKeyword,condition,sortOrder));
      }

      const handleSort = (e) =>{  
        e.preventDefault();         
        setSortOrder(e.target.value);
        dispatch(listProducts(category,searchKeyword,condition,sortOrder));
      }




    return(
        <Layout>
        <SiteHeader />        
        <Content className="container" style={{backgroundColor:'white'}}>
            <div>
                <div className="product-filter">
                    <ul className="">
                        <li>
                            <div className="condition">
                                 Condition:{' '}
                                <select onChange={handleFilter}>
                                <option value="">All</option>
                                    <option value="New">New</option>
                                    <option value="Foreign Pre-owned">Foreign Pre-owned</option>
                                    <option value="Refurbished">Refurbished</option>
                                    <option value="Open Box">Open Box</option>
                                </select>
                            </div>
                        </li>
                        <li>
                            <div className="arrange">
                             Sort:{' '}
                                <select name="Sort" onChange={handleSort}>
                                    <option value="">Newest</option>
                                    <option value="Lowest">Lowest</option>
                                    <option value="Highest">Highest</option>
                                </select>
                            </div>
                        </li>
                    </ul>
                    
                 
                 
                 </div>
                 <div className="search-product">
                     <ul>
                         {products.map(product=>(
                             
                             <li key={product._id}>
                             {/* <div className="single-product"> */}
                            
                                 <div className="product-image">
                                 <Link to={'/product/' + product._id} >
                                 <img src={`http://localhost:5000/${product.images}`} alt="Avatar" /> 
                                 </Link>
                                 </div>
                                 
                                 <div className="product-desc">
                                     <h3>{product.title}</h3>
                                     {product.discounted_price?
                                      <>
                                      <span><p style={{color:"red"}}>&#8358;<s>{product.price}</s></p></span>
                                      <span><h3 style={{color:"black"}}>&#8358;{product.discounted_price}</h3></span>
                                      </>:
                                      <span><p style={{color:"black"}}>&#8358;{product.price}</p></span> 

                                     }                                    
                                     <p>{product.condition}</p>
                                     <p>{product.brand}</p>
                                     <Link to={'/product/' + product._id} ><p style={{color:"black"}}>Buy Now</p></Link>
                                 </div>
                                 

                             {/* </div> */}
                         </li>

                         ))}
                         
                     </ul>

                 </div>
             </div>
                  
           
          
        </Content>
        
        <Footer className="footer"><p>Copyright 2021 All right reserved.</p></Footer>
    </Layout>
    )
    
}

export default Search;