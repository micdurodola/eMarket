import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from 'antd';
import SiteHeader from "../Layout/header";
import { Tabs } from 'antd';
import { useSelector,useDispatch } from "react-redux";
import {saveProduct,listProducts, deleteProduct} from '../actions/productAction';
import {listOrders,deleteOrder} from '../actions/orderAction';





const Admin = () =>{
    const {Footer,Content } = Layout; 
    const { TabPane } = Tabs;    
    
    const productList = useSelector((state)=>state.productList);
    const{loading,error,products} = productList;
    const productSave = useSelector((state)=>state.productSave);
    const{loading:loadingSave,
        error:errorSave,
        success:successSave} = productSave;
        const productDelete = useSelector((state)=>state.productDelete);
        const{loading:loadingDelete,
            error:errorDlete,
            success:successDelete} = productDelete;  
            
            const orderDelete = useSelector(state => state.orderDelete);
            const { loading: loadingOrderDelete, success: successOrderDelete, error: errorOrderDelete } = orderDelete;
            
    const orderList = useSelector((state)=>state.orderList);
    const{loading:loadingOrder,error:errorOrder,orders:orders} = orderList;

    const dispatch = useDispatch();
    useEffect(() => {
        if (successSave) {
          setModalVisible(false);
        }
        dispatch(listProducts());
        dispatch(listOrders());
        return () => {
          //
        };
      }, [successSave,successDelete]);
    
      const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(saveProduct({ _id: id,
            name,title,description,images,brand,price,discounted_price,category,countInStock,condition
        }));
    }

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
      };

      const deleteOrderHandler = (order) => {
        dispatch(deleteOrder(order._id));
      }



    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState("");
    const[name,setName] = useState("");
    const[title,setTitle] = useState("");
    const[description,setDescription] = useState("");
    const[images,setImages] = useState("");
    const[brand,setBrand] = useState("");
    const[price,setPrice] = useState("");
    const[discounted_price,setDiscounted_price] = useState("");
    const[category,setCategory] = useState("");
    const[countInStock,setCountInStock] = useState("");
    const[condition,setCondition] = useState("");

    const openModal = (product) => {
        setModalVisible(true); 
        setId(product._id);       
        setName(product.name);
        setTitle(product.title);
        setDescription(product.description);
        setImages(product.images);
        setBrand(product.brand);
        setPrice(product.price);
        setDiscounted_price(product.discounted_price);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setCondition(product.condition);
      };
     



    return(
      
        <Layout>
         <SiteHeader/>         
      
        <Content className="content"> 
        <Tabs defaultActiveKey="1" style={{alignItems:"center"}}>
        <TabPane tab="Products" key="1">
        <Content>
        <div className="content content-margined">
            {/* Create Product Button */}
            <div className="product-header">
                <h3>Products</h3>
                <button style={{backgroundColor:"#e32636",color:"#ffffff", 
                border:"1px solid #e32636", borderRadius:"20px", padding:"5px 10px", margin:"10px"}} 
                onClick={() => openModal({})}>
                Create Product
                </button>
            </div> 
            
            {modalVisible && (
                <div className="form">            
                <form onSubmit={handleSubmit}>
                    <ul className="form-contained">
                        <li>
                            <h2>Add product</h2>
                        </li> 
                        <li>
                            {loadingSave && <div>Loading...</div>}
                            {errorSave && <div>{errorSave}</div>}
                        </li>                    
                     
                        <li>
                            <label htmlFor="address">Name</label>
                            <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="address">Title</label>
                            <input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        </li>
                        <li>
                            <label htmlFor="description">desctiption</label>
                            <textarea placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                            
                        </li>
                        <li>
                            <label htmlFor="images">Images</label>
                            <input placeholder="Images" value={images} onChange={(e)=>setImages(e.target.value)}/>
                            
                        </li>
                        <li>
                            <label htmlFor="price">Brand</label>
                            <input placeholder="Brand" value={brand} onChange={(e)=>setBrand(e.target.value)}/>
                        </li>

                        <li>
                            <label htmlFor="price">Price</label>
                            <input placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                        </li>

                        <li>
                            <label htmlFor="state">Discounted Price</label>
                            <input placeholder="Discount Price" value={discounted_price} onChange={(e)=>setDiscounted_price(e.target.value)} />

                        </li>
                        <li>
                            <label htmlFor="state">Category</label>
                            <input placeholder="Category" value={category} onChange={(e)=>setCategory(e.target.value)}/>

                        </li>
                        <li>
                            <label htmlFor="state">Available Stock</label>
                            <input placeholder="Available stock" value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}/>

                        </li>
                        <li>
                            <label htmlFor="state">Condition</label>
                            <input placeholder="Condition" value={condition} onChange={(e)=>setCondition(e.target.value)}/>

                        </li>
                        <li>
                        <button type="submit" className="button primary">
                             {id ? 'Update' : 'Create'}
                             </button>
                         </li>
                         <li>
                          <button type="submit" className="button secondary" onClick={() => setModalVisible(false)}>Back</button>
                         </li>

                    </ul>
                   
                </form>
            </div>

            )}
            
            {/* Product List table */}
        <div className="product-list">
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Discount Price</th>
              <th>Category</th>
              <th>Condition</th>
              <th>Brand</th>              
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              {products.map((product)=>(
                   <tr>
                   <td>{product._id}</td>
                   <td>{product.name}</td>
                   <td>{product.price}</td>
                   <td>{product.discounted_price}</td>
                   <td>{product.category}</td>
                   <td>{product.condition}</td>
                   <td>{product.brand}</td>                                 
                   <td>
                     <button style={{backgroundColor:"blue",color:"#fff", padding:"2px 4px",
                     border:"1px solid blue", borderRadius:"5px"
                    }} onClick={() => openModal(product)} >
                       Edit
                     </button>{' '}
                     <button style={{backgroundColor:"red",color:"#fff", padding:"2px 4px",
                     border:"1px solid #e32636", borderRadius:"5px"
                    }}
                      onClick={() => deleteHandler(product)}>                 
                     
                       Delete
                     </button>
                   </td>
                   </tr>

              ))}        

          </tbody>
        </table>
      </div>
      </div>         
      
        </Content>
        </TabPane>
        <TabPane tab="Orders" key="2">
        <Content className="container">
                <div className="dashboard-table">
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th> User</th>
                                    <th> Paid</th>
                                    <th> Paid At</th>
                                    <th>Delivered</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                              {loadingOrder? <div>Loading...</div>:
                              error? <div>{errorOrder}</div>:
                              orders.map((order)=>(
                                <tr>
                                <td>{order._id}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.user.name}</td>
                                <td>{order.isPaid.toString()}</td>
                                <td>{order.paidAt}</td>
                                <td>{order.isDelivered.toString()}</td>
                                <td>
                                   <Link to={"/order/" + order._id}>Details</Link>
                                     {' '}
                                   <button type="button" className="button secondary" onClick={()=>deleteOrderHandler(order)}>Delete</button>
                                </td>
                            </tr>  

                              ))}
                               
                                               
                            
                            </tbody>
                        </table>
                </div>
                
                </Content>
   
        </TabPane>       
      </Tabs>
       

        </Content>
        <Footer className="footer"><p>Copyright 2021 All right reserved.</p></Footer>
      </Layout>
        
    )
}

export default Admin;






