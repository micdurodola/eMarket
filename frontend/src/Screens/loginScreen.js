import React,{useState,useEffect} from "react";
import {useSelector,useDispatch} from 'react-redux'
import { signin } from "../actions/userAction";
import { Layout } from 'antd';
import { Form, Input, Button, Checkbox, Divider } from 'antd'; 
import SiteHeader from "../Layout/header";
import { UserOutlined, LockOutlined } from '@ant-design/icons';



const Login = (props) => {
  const { Footer,Content } = Layout;
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const userSignin = useSelector((state)=>state.userSignin);
    const{loading,error,userInfo} = userSignin;
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    const handleSubmit=(e)=>{
      e.preventDefault();
      dispatch(signin(email,password));

    }
    useEffect(()=>{
      if(userInfo){
        props.history.push(redirect);
      }

    },[userInfo]);

   

    return(
        <Layout>
         <SiteHeader/>        
        <Content className="container">
        <div className="form-container">
         
        <Form
        
        name="normal_login"
        className="login-form form-login"
        initialValues={{
          remember: true,
        }}
        
        onSubmit={handleSubmit}
       
        
  >
     <div style={{color:"red", textAlign:"center",margin:"20px"}}>{error}</div>
    <Form.Item
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your Username!',
        },
      ]}
    >
      <Input prefix={<UserOutlined className="site-form-item-icon form-input" />} placeholder="Username"
      onChange={(e)=>setEmail(e.target.value)} />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your Password!',
        },
      ]}
    >
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Password" onChange={(e)=>setPassword(e.target.value)}
      />
    </Form.Item>
    <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle >
          <Checkbox >Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" style={{color:"#e32636"}}
        href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <div className="">
            <Button type="primary" style={{background:"linear-gradient(0deg, rgba(255,51,106,1) 0%, rgba(227,38,54,1) 35%, rgba(161,16,28,1) 100%)",border:"none"}}
             htmlType="submit"  className="form-buttom" onClick={handleSubmit}>
              Log in
            </Button>               
        </div>        
        
      </Form.Item>
  
  </Form>

      
        
  </div>
    </Content>
        
    <Footer className="footer"><p>Copyright 2021 All right reserved.</p></Footer>
    </Layout>
        
    )
}

export default Login;






  