import { ADD_TO_CART,SAVE_SAVE_SHOPPING,REMOVE_ITEM_CART } from "../constans/cartConstans";

export const cartReducer = (state = { cartItems: [],informacion_compras: {} }, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        const item = action.payload;
  
        const isItemExist = state.cartItems.find(
          (i) => i.product === item.product
        );
  
        if (isItemExist) {
          return {
            ...state,
            cartItems: state.cartItems.map((i) =>
              i.product === isItemExist.product ? item : i
             //i.product === isItemExist.product ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }
  

        case REMOVE_ITEM_CART:
          return{
            ...state,
            cartItems: state.cartItems.filter(i=>i.product !== action.payload)
          }


        case SAVE_SAVE_SHOPPING:
          return{
            ...state,
            informacion_compras: action.payload
          }
      default:
        return state;
    }
  };