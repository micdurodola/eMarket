import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import { useSelector} from 'react-redux';



 export const ProtectedRoute = ({component:Component, ...rest})=>{
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
 

    return(
        <Route {...rest} render={
            (props)=>{
                if(userInfo.token){
                    return <Component {...props} />
                }
                else{
                    return <Redirect to ={{
                        pathname:"/",
                        state:{
                            from:props.location
                        }

                    }} />

                }
               
            }
        } />

    );
};

