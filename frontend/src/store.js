import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import Cookie from 'js-cookie';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;
const initialState = {
    cart:{cartItems,shipping: {}, payment: {} },
    userSignin: { userInfo },
    
};
const middleware = [thunk];

const store = createStore(rootReducer,initialState,
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;