import axios from "axios";
import { PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_SAVE_REQUEST,PRODUCT_SAVE_SUCCESS } from "../constants/productConstant";


const listProducts =(
    category='',
    searchKeyword='',
    condition='',
    sortOrder=''
)=>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_LIST_REQUEST});
        const {data} = await axios.get('/api/v1/product?category=' 
        + category + '&searchKeyword=' + searchKeyword + '&condition=' + condition + '&sortOrder=' + sortOrder);
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data});
    }
    catch(error){
        dispatch({type:PRODUCT_LIST_FAIL,payload:error.message});
    }
    
}

const detailProduct = (productId)=>async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        const{data} = await axios.get("/api/v1/product/" + productId);
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data});
        
    } catch (error) {
        dispatch({type:PRODUCT_DETAILS_FAIL,payload:error.message});
        
    }
   
}

const saveProduct = (product)=>async(dispatch,getState)=>{
    try {
        dispatch({type:PRODUCT_SAVE_REQUEST,payload:product});
        const {userSignin: { userInfo },} = getState(); 
        
        if(!product._id){
            const { data } = await axios.post('/api/v1/product/add/',product,{
                headers:{
                    "x-auth-header": userInfo.token
                }
            });

            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });     

        }
        else{
            const { data } = await axios.put('/api/v1/product/update/' + product._id,product,{
                headers:{
                    Authorization: 'Bearer' + userInfo.token,
                },
            });

            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });     
        }
                

    } catch (error) {
        dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
    }

}

const deleteProduct = (productId) =>async(dispatch,getState)=>{
    try {
        dispatch({type:PRODUCT_DELETE_REQUEST,payload: productId});
        const {userSignin: { userInfo },} = getState(); 
        const {data} = await axios.delete("/api/v1/product/delete/" + productId,{
            headers:{
                Authorization: 'Bearer' + userInfo.token,
            }
        });
        dispatch({type:PRODUCT_DELETE_SUCCESS,payload:data,success:true})
        
    } catch (error) {
        dispatch({type:PRODUCT_DELETE_FAIL,payload:error.message})
        
    }
   
    
}




export{listProducts,detailProduct,saveProduct,deleteProduct}