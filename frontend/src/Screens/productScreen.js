import React, { useEffect,useState } from "react";
import {Link,useHistory} from "react-router-dom";
import { Layout,Divider,Skeleton,Rate} from 'antd';
import SiteHeader from "../Layout/header";
import { useDispatch, useSelector } from "react-redux";
import { detailProduct } from "../actions/productAction";


const Product = (props) =>{
    const { Header, Footer,Content } = Layout;
    const[qty, setQty] = useState(1);

    const productDetails = useSelector((state=>state.productDetails));
    const{loading,product,error} = productDetails;
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(detailProduct(props.match.params.id));

    },[]);

    const handleAddToCart = ()=>{
        props.history.push('/cart/' + props.match.params.id + "?qty=" + qty);
    }
    let history = useHistory();
    
    return(
        <Layout>
        <SiteHeader/>
       <Content className="product-content"> 
       {loading?(<Skeleton />):
       error?(<div>{error}</div>):(
        <div>
        <div className="back">
        <button onClick={() => history.goBack()} className="button-back">Back</button>
        
               <div className="product-detail" key={product._id}>    
                
               <div className="product-image">            
                   <img src={`/${product.images}`} />
               </div>
               <div className="product-info">
                   <ul>
                       <li><h2>{product.title}</h2></li>
                       <li><h2><Rate  className="rating"/></h2></li>                       
                       
                       <Divider />
                       <li><h3>Condition:{product.condition}</h3></li>
                       <li><h3>Price:<b>${product.price}</b></h3></li>
                       <li><h3>Brand:{product.brand}</h3></li>
                       <Divider />
                       <li><p>{product.description}</p></li>
                   </ul>
               </div>
               <div className="product-check">
               <ul>
                   <li><h3>Price:<b>${product.price}</b></h3></li> 
                   <li><h3>Status:<b>{product.countInStock>0?"In Stock":"Unavailable"}</b></h3></li>             
                       <Divider />
                       <label>Qty:</label>
                       <select  value={qty} onChange={(e)=>setQty(e.target.value)}>
                           {[...Array(product.countInStock).keys()].map((x)=>(
                               <option key={x=+1} value={x+1}>{x+1}</option>
                           ))}
                           
                       </select>                      
                                   
                   </ul>
                   <div className="add-to-cart">
                   <button className="btn-success" type="submit" onClick={handleAddToCart}><Link to="/cart" style={{color:"#fff"}}>Add to cart</Link></button>
                   </div>
                  
               </div>
           </div>

       
        </div>
        
         
        </div>

       )
       }
      
       
           

       </Content>
       <Footer className="footer"><p>Copyright 2021 All right reserved.</p></Footer>
     </Layout>
    )
}

export default Product;