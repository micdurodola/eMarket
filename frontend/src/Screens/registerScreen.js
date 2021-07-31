import React,{useState,useEffect} from "react";
import { Layout } from 'antd';
import SiteHeader from "../Layout/header";
import { register } from "../actions/userAction";
import { Form, Input, Checkbox, Button, AutoComplete,Divider } from 'antd';
import Password from "antd/lib/input/Password";
import { useDispatch, useSelector } from "react-redux";




const Register = (props) =>{
    const {  Footer,Content } = Layout;
    const userRegister = useSelector((state)=>state.userRegister);
    const{loading,error,userInfo} = userRegister;
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    const handleSubmit=(e)=>{
      e.preventDefault();
      dispatch(register(name,email,password));

    }
    useEffect(()=>{
      if(userInfo){
        props.history.push(redirect);      
      }

    },[userInfo]);

    return(
        <Layout>
        <SiteHeader />
        
        <Content className="container">
          <div className="registration-form">
                     
              <div className="form-body">
                  <h3><b>Register</b></h3>  
        <Form
        className="form-login"   scrollToFirstError form={form} onSubmit={handleSubmit}>
          <div style={{color:"red", textAlign:"center",margin:"20px"}}>{error}</div> 

<Form.Item
        name="name"        
        rules={[
        
          {
            required: true,
            message: 'Please input your Name!',
          }
        ]}
      >
        <Input placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
      </Form.Item>

      <Form.Item
        name="email"        
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Item>

      <Form.Item
        name="password"
        
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Item>

      <Form.Item
        name="confirm"       
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm password" />
    </Form.Item>



    {/* <Form.Item className="reg-agreement"
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item> */}
      <Form.Item >
        <Button type="primary" style={{background:"linear-gradient(0deg, rgba(255,51,106,1) 0%, rgba(227,38,54,1) 35%, rgba(161,16,28,1) 100%)",border:"none"}}
        htmlType="submit" className="form-buttom" onClick={handleSubmit}  >
            Register
        </Button>
      </Form.Item>
      {/* <Divider>or</Divider>
      <Form.Item >
        <Button type="primary" htmlType="submit" className="button-social" >
          Register
        </Button>
      </Form.Item> */}
    </Form>
    </div>
    </div>
        
        </Content>
        
        <Footer className="footer"><p>Copyright 2021 All right reserved.</p></Footer>
    </Layout>
        
    )
}

export default Register;
  