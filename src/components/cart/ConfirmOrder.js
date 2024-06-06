import React,{Fragment,useState} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { saveShoppingInfo } from '../../actions/cartActions'
import CheckoutSteps from './CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData'

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const {cartItems,informacion_compras} = useSelector(state => state.cart) 
  const {user} = useSelector(state=>state.auth)
  const itemPrice = cartItems.reduce((acc,item)=> acc+item.precio * item.quantity, 0)
  const shoppingPrice = itemPrice > 200 ? 0 : 25
  const taxprice = Number((0.05 * itemPrice).toFixed(2))
  const totalPrice = (itemPrice + shoppingPrice + taxprice).toFixed(2)
  const proccesToPayment = () =>{
    const data = {
        itemPrice: itemPrice.toFixed(2),
        shoppingPrice,
        taxprice,
        totalPrice
    }
    sessionStorage.setItem('ordenInfo',JSON.stringify(data))
    navigate('/payment')
  }
  return (
    <Fragment>
          <MetaData title={'confirmar orden'} />
        <CheckoutSteps shopping confirmOrder />

        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-confirm">

                <h4 className="mb-3">informacion de compra</h4>
                <p><b>Nombre:</b> {user && user.nombre} </p>
                <p><b>telefono:</b> {informacion_compras.telefono}</p>
                <p className="mb-4"><b>direccion:</b> {informacion_compras.direccion}</p>
                
                <hr />
                <h4 className="mt-4">Carrito:</h4>
                {cartItems.map(item=>(
                    <Fragment>
                          <hr />
                <div className="cart-item my-1" key={item.product}>
                    <div className="row">
                        <div className="col-4 col-lg-2">
                            <img src={item.imagen} alt="Laptop" height="100" width="100" />
                        </div>

                        <div className="col-5 col-lg-6">
                            <Link  to={`/product/${item.product}`}>{item.nombre}</Link>
                        </div>


                        <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                            <p>{item.quantity} x ${item.precio} = <b>${ item.quantity*item.precio}</b></p>
                        </div>

                    </div>
                </div>
                <hr />
                    </Fragment>
                ))}
              

            </div>
			
			<div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Resumen del pedido</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${itemPrice}</span></p>
                        <p>envio: <span className="order-summary-values">${shoppingPrice}</span></p>
                        <p>iva:  <span className="order-summary-values">${taxprice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" onClick={proccesToPayment} className="btn btn-primary btn-block">Proceder a Pagar</button>
                    </div>
                </div>
			
			
        </div>
    </Fragment>
  )
}

export default ConfirmOrder
