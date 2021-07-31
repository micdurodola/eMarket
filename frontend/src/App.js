import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { ProtectedRoute} from "./components/protected.route";
import { AdminRoute } from "./components/admin.route";
import 'antd/dist/antd.css';
import './App.css';
import Home from './Screens/homeScreen';
import Login from './Screens/loginScreen';
import Register from './Screens/registerScreen';
import Product from './Screens/productScreen';
import Dashboard from './Screens/dashboardScreen';
import Cart from "./Screens/cartScreen";
import Shipping from "./Screens/shippingScreen";
import Payment from "./Screens/paymentScreen";
import PlaceOrder from "./Screens/placeorderScreen";
import OrderScreen from './Screens/orderScreen';
import NewProduct from './Screens/addProductScreen';
import Category from './Screens/categoryScreen';
import Search from './Screens/searchScreen';
import Admin from './Screens/adminScreen';






function App() {
  return (
   
    <div className="App"> 
   
      <Router>  
        <Switch>     
        <Route exact path="/"  component={Home} />
        <Route exact path="/login"  component={Login} />
        <Route exact path="/register"  component={Register} />
        <Route exact path="/product/:id"  component={Product} />
        <Route exact path="/cart/:id?"  component={Cart} />
        <Route exact path="/shipping"  component={Shipping} />
        <Route exact path="/payment"  component={Payment} />
        <Route exact path="/placeorder"  component={PlaceOrder} />
        <Route exact path="/order/:id"  component={OrderScreen} />
        <ProtectedRoute exact path="/user-dashboard" component={Dashboard}/>        
        <Route path="/category/:id" exact component={Category} />
        <Route path="/search/s" exact component={Search} />    
        <AdminRoute exact path="/admin" component={Admin}/> 
        {/* <Route path="/user-dashboard" exact component={Dashboard}></Route>    */}   
        {/* <Route path="/admin-dashboard/new-product" exact component={NewProduct}></Route>  */}
        {/* <Route path="/admin" exact component={Admin}></Route>     */}
       
        </Switch> 
        
      </Router>
    </div>
  );
}

export default App;
