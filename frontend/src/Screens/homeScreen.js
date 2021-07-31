import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Carousel,Skeleton } from 'antd';
import SiteHeader from "../Layout/header";
import computer from '../images/category/catcomputer.jpg';
import game from '../images/category/category-game.jpg';
import laptop from '../images/category/catlaptop.jpg';
import phone from '../images/category/catphones.jpg';
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productAction";




const Home = () =>{
    const {Footer,Content } = Layout;    
    const productList = useSelector((state)=>state.productList);
    const{loading,products,error} = productList;
    const dispatch = useDispatch();



    useEffect(()=>{
      dispatch(listProducts());
    },[]);


    return(
      
        <Layout>
         <SiteHeader/>
        <Content className="content"> 
        <div className="carousel" >      
      <>
        <Carousel autoplay className="carousel">
        <div className="slider-image1">                   
           
        </div>
        <div className="slider-image2">                   
           
        </div>
        <div className="slider-image3">                   
           
        </div>
        <div className="slider-image4">                   
           
        </div>
      
          {/* <div>
            <h3 style={{ backgroundColor: 'blue',
                         height: 300 }}>Item 2</h3>
          </div> */}
          
           
        </Carousel>
      </>
    </div>

      
         
          <div className="cat-section"> 
          
            
              <div className="card">                
              <Link to="/category/cat?query=Laptop" >
              <h4 className="cat-list"><b>Laptop</b></h4>
                <img src={laptop} alt="Avatar" style={{width:"100%"}} />              
                  <p>Shop Now</p>  
                </Link>           
              </div> 
             
              <div className="card">
                <Link to = "/category/cat?query=Game" >
                <h4 className="cat-list"><b>Game</b></h4>
                <img src={game} alt="Avatar" style={{width:"100%"}} />              
                  <p>Shop Now</p> 
                  </Link>              
              </div> 

              <div className="card">
              <Link to = "/category/cat?query=Computer-accessories" >
                  <h4 className="cat-list"><b>Computer</b></h4>
                  <img src={computer} alt="Avatar" style={{width:"100%"}} />              
                  <p>Shop Now</p>  
                 </Link>             
              </div> 

              <div className="card">
              <Link to = "/category/cat?query=Phone" >
                <h4 className="cat-list"><b>Phone</b></h4>
                <img src={phone} alt="Avatar" style={{width:"100%"}} />             
                  <p>Shop Now</p>  
                </Link>             
              </div>               
    
            </div> 

            <div className="product-section">
             
                <div className="category-list">
                  <ul>
                    <li><h3><b>CATEGORY </b></h3></li>
                    <li><Link to="/category/cat?query=Laptop">Laptop</Link></li>
                    <li><Link to="/category/cat?query=Phone">Phones</Link></li>
                    <li><Link to="/category/cat?query=Computer-accessories">Computer and Accessories</Link></li>
                    <li><Link to="/category/cat?query=Game">Video Games</Link></li>                                   

                  </ul>
                
                </div>
                
                {loading? (<Skeleton active />):
                error?(<div>{error}</div>): (   
                                              
                <div className="product-lists"> 

                  {products.map((product)=>(
                    
                     
                     <div className="card" key={product._id}>                                          
                       <Link to={'/product/' + product._id} ><img src={`/${product.images}`} alt="Avatar" style={{width:"100%"}} />              
                         <h4>{product.title}</h4> 
                        {product.discounted_price? 
                        <>
                        <span><p style={{color:"red"}}>&#8358;<s>{product.price}</s></p></span>
                        <span><p style={{color:"black"}}>&#8358;{product.discounted_price}</p></span>
                        </>
                        :
                        <>
                        <span><p style={{color:"black"}}>&#8358;{product.price}</p></span> 
                        <span><p style={{color:"#4d4a57", fontSize:"13px", textTransform:"capitalize"}}>Condition: {''}{product.condition}</p></span> 
                        </>                      
                        }                   
 
                         </Link>
                        

                     </div> 
 

                    ))}             

                </div>
                  )}
              </div>          

        </Content>
        <Footer className="footer"><p>Copyright 2021 All right reserved.</p></Footer>
      </Layout>
        
    )
}

export default Home;






