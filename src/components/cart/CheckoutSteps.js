import React from 'react'
import { Link } from 'react-router-dom'
const CheckoutSteps = ({shopping,confirmOrder,payment}) => {
  return (
    <div className="checkout-progress d-flex justify-content-center mt-5" >
        {shopping ? <Link to="shopping" className="float-right">
            <div className="triangle2-active"></div>
            <div className="step active-step">envio</div>
            <div className="triangle-active"></div>
        </Link> : <Link to='#!' disabled>
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">envio</div>
            <div className="triangle-incomplete"></div>      
        </Link>}

        {confirmOrder ? <Link to="/order/confirm" className="float-right">
            <div className="triangle2-active"></div>
            <div className="step active-step">confirmar orden</div>
            <div className="triangle-active"></div>
        </Link> : <Link to='#!' disabled>
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">confirmar orden</div>
            <div className="triangle-incomplete"></div>      
        </Link>}


        {payment ? <Link to="/payment" className="float-right">
            <div className="triangle2-active"></div>
            <div className="step active-step">pago</div>
            <div className="triangle-active"></div>
        </Link> : <Link to='#!' disabled>
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">pago</div>
            <div className="triangle-incomplete"></div>      
        </Link>}
      
    </div>
  )
}

export default CheckoutSteps
