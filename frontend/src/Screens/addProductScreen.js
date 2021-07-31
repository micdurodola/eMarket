import React,{useEffect, useState} from "react";
import { Layout } from 'antd';
import SiteHeader from "../Layout/header";
import { useDispatch, useSelector } from "react-redux";
import {saveProduct,listProducts, deleteProduct} from '../actions/productAction';





const NewProduct = () =>{
    const { Footer,Content } = Layout;
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
        

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
          setModalVisible(false);
        }
        dispatch(listProducts());
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
        <SiteHeader />
        
        <Content>
        <div className="content content-margined">
            {/* Create Product Button */}
            <div className="product-header">
                <h3>Products</h3>
                <button className="button primary" onClick={() => openModal({})}>
                Create Product
                </button>
            </div> 
            {/* Add Form */}
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
                     <button className="button" onClick={() => openModal(product)} >
                       Edit
                     </button>{' '}
                     <button className="button" onClick={() => deleteHandler(product)}>                 
                     
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
        
        <Footer className="footer"><p>Copyright 2021 All right reserved.</p></Footer>
    </Layout>
    )
}

export default NewProduct;



