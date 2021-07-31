import axios from 'axios';
import Cookie from 'js-cookie';
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from '../constants/userConstants';

const signin = (email,password)=>async(dispatch)=>{
    try {
        dispatch({type:USER_SIGNIN_REQUEST})
        const{data} = await axios.post("/api/v1/auth/login",{email,password});
        dispatch({type:USER_SIGNIN_SUCCESS,payload:data});
        Cookie.set('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({type:USER_SIGNIN_FAIL,payload:error.message});
        
    }
    
    
}

const register = (name,email,password) => async(dispatch) => {
    try {
        dispatch({type:USER_REGISTER_REQUEST,payload: { name, email, password }});
        const{data}= await axios.post("/api/v1/user/register",{name,email,password});
        dispatch({type:USER_REGISTER_SUCCESS,payload:data});
        Cookie.set('userInfo', JSON.stringify(data));
        
    } catch (error) {
        dispatch({type:USER_REGISTER_FAIL,payload:error.message});
        
    }
    
}


const signout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_SIGNOUT })
  }
export{signin,register,signout}