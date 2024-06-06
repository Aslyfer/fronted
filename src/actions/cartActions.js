import axios from 'axios';
import { ADD_TO_CART,REMOVE_ITEM_CART,SAVE_SAVE_SHOPPING } from '../constans/cartConstans';

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.products._id,
      nombre: data.products.nombre,
      precio: data.products.precio,
      imagen: data.products.imagenes[0].url,
      stock: data.products.stock,
      quantity,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
dispatch({
  type: REMOVE_ITEM_CART,
  payload: id
});

localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


export const saveShoppingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SAVE_SHOPPING,
    payload: data
  });
  
  localStorage.setItem("informacion_compras", JSON.stringify(data));
  };
  
