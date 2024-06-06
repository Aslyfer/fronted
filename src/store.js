import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducers, productDetailReducer,newReviewReducer } from './reducers/productReducers';
import { authReducers,userReducers } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReucers';
import { newOrderReducer,myOrdersReducer,orderDetailReducer } from './reducers/orderReducers';
const reducer = combineReducers({
  products: productReducers,
  productDetails: productDetailReducer,
  auth: authReducers, 
  user: userReducers,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailReducer,
  newReview: newReviewReducer
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
      informacion_compras: localStorage.getItem('informacion_compras')
      ? JSON.parse(localStorage.getItem('informacion_compras'))
      : {},
  },

};
const middleware = [thunk];
const store = createStore(
  reducer, 
  initialState,
    /*  composeWithDevTools(applyMiddleware(...middleware)) */
     applyMiddleware(thunk)           
);

export default store;
