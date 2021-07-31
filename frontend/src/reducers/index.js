import { combineReducers } from "redux";
import { productListReducer,productDetailsReducer,productSaveReducer,productDeleteReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";
import { userSigninReducer,userRegisterReducer } from "./userReducer";
import { orderCreateReducer,orderDetailsReducer,
    orderPayReducer,myOrderListReducer,orderListReducer,orderDeleteReducer } from "./orderReducer";

export default combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    productSave:productSaveReducer,
    productDelete:productDeleteReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    myOrderList:myOrderListReducer,
    orderList:orderListReducer,
    orderDelete:orderDeleteReducer

});