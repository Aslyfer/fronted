import React from 'react';
import { useEffect,useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import ProctedRoute from './components/routes/ProctedRoute';
import UpdateUserProfile from './components/user/UpdateUserProfile';
import Profile from './components/user/Profile';
import Shopping from './components/cart/Shopping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import UpdateProfile from './components/user/UpdateProfile';
import Cart from './components/cart/Cart';
import { loadUser } from './actions/userActions';
import Payment from './components/cart/Payment';
import ListOrder from './components/orders/ListOrder';
import ListOrderDetails from './components/orders/ListOrderDetails';
import Dashboard from './components/admin/Dashboard';
import ListProduct from './components/admin/ListProduct';
import store from './store';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
function App() {
  const [stripeApiKey,setStripeApiKey] = useState('')

  useEffect(()=>{
    store.dispatch(loadUser());
    async function getStripeApiKey(){
      const {data} = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();

  },[])
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register/>}></Route>

          <Route path='/profile' element={<ProctedRoute/>}>
          <Route path='/profile' element={<Profile/>} />  
          </Route>

          <Route path='/cart' element={<ProctedRoute/>}>
          <Route path='/cart' element={<Cart/>} />  
          </Route>

          <Route path='/confirm' element={<ProctedRoute/>}>
          <Route path='/confirm' element={<ConfirmOrder/>} />
          </Route>

          <Route path='/payment' element={<ProctedRoute/>}>
          {stripeApiKey && (
                <Route
                  path="/payment"
                  element={
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <Payment />
                    </Elements>
                  }
                />
              )}
          </Route>

          <Route path='/password/update' element = {<UpdateUserProfile />} ></Route>
          <Route path='/me/update' element = {<UpdateProfile />}></Route>
          <Route path='/shipping' element = {<Shopping />}></Route>
          <Route path='/orders/me' element = {<ListOrder />}></Route>
          <Route path='/order/:id' element = {<ListOrderDetails />}></Route>

        </Routes>
        </div>
        <Routes>
        <Route element={<ProctedRoute admin={true} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<ProctedRoute admin={true} />}>
          <Route path="/admin/products" element={<ListProduct />} />
        </Route>

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
