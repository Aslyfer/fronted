import React,{useEffect,Fragment,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData'
import { addItemToCart,removeItemsFromCart } from '../../actions/cartActions'

const Cart = () => {
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartItems} = useSelector(state => state.cart)
    const {isAuthenticated} = useSelector(state=>state.auth)
    const removeCartItemHandler = (cartItems) =>{
        dispatch(removeItemsFromCart(cartItems))
        alert.success('producto borrado con exito de tu carrito')
    }

    const increaseQty =(id,quantity,stock) =>{
        const newQty = quantity+1

        if (newQty>stock) return;

        dispatch(addItemToCart(id,newQty))
    }

    const decreaseQty =(id,quantity) =>{
        const newQty = quantity - 1;

        if (newQty <= 0) return;

        dispatch(addItemToCart(id,newQty))
    }

    const checkouthandler = () =>{
        if(!isAuthenticated){
            navigate('/login?redirect=/shipping')
         } else{
            navigate('/shipping')
         }
    }
  return (
    <Fragment>
        <MetaData title={'tu carrito'}/>
        {cartItems.length === 0 ? <h2 className='mt-5'>tu carrito esta vacio</h2>: (
            <Fragment>
                <h2 class="mt-5">tu Carrito: <b>{cartItems.length} items</b></h2>
        
        <div class="row d-flex justify-content-between">
            <div class="col-12 col-lg-8">
               {cartItems.map(item=>(
                <Fragment>
                    <hr />
                    <div class="cart-item">
                    <div class="row">
                        <div class="col-4 col-lg-3">
                            <img src={item.imagen} alt="Laptop" width="100rem"/>
                        </div>

                        <div class="col-5 col-lg-3">
                            <Link to={`/product/${item.product}`}>{item.nombre}</Link>
                        </div>


                        <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">${item.precio}</p>
                        </div>

                        <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div class="stockCounter d-inline">
                                <span class="btn btn-danger minus" onClick={()=>decreaseQty(item.product,item.quantity)}>-</span>
                                <input type="number" class="form-control count d-inline" value={item.quantity} readOnly />

								<span class="btn btn-primary plus" onClick={()=> increaseQty(item.product,item.quantity,item.stock)}>+</span>
                            </div>
                        </div>

                        <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                            <i id="delete_cart_item" class="fa fa-trash btn btn-danger" onClick={()=> removeCartItemHandler(item.product)}></i>
                        </div>

                    </div>
                </div>
                <hr />
                </Fragment>
               ))}
            </div>

            <div class="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>ordenes del dia</h4>
                    <hr />
                    <p>Subtotal: {cartItems.reduce((acc,item) => (acc+Number(item.quantity)),0) } <span class="order-summary-values">{cartItems.length} (unidades)</span></p>
                    <p>Est. total: <span class="order-summary-values">${cartItems.reduce((acc,item)=> acc + item.quantity*item.precio,0).toFixed(2)}</span></p>
    
                    <hr />
                    <button id="checkout_btn" class="btn btn-primary btn-block"
                    onClick={checkouthandler}  >Checkear orden</button>
                </div>
            </div>
        </div>
            </Fragment>
        )}
    </Fragment>
  )
}

export default Cart
