import React, { Fragment,useEffect } from 'react'
import {useStripe,useElements,CardNumberElement,CardExpiryElement,CardCvcElement} from '@stripe/react-stripe-js'
import { useDispatch,useSelector } from 'react-redux'
import CheckoutSteps from './CheckoutSteps';
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData';
import axios from 'axios'
import { createOrders } from '../../actions/orderActions';
import { useNavigate } from 'react-router-dom';

const options = {
    style:{
        base:{
            fontSize: "16px" 
        },
        invalid:{
            color: "#9e2146"
        }
    }
}
const Payment = () => {
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.auth)
    const {informacion_compras,cartItems} = useSelector(state => state.cart)

    useEffect(()=>{

    },[])
    const orderInfo = JSON.parse(sessionStorage.getItem('ordenInfo'))
    const paymentData = {
      amount: Math.round(orderInfo.totalPrice * 100)
    }
    const submitHandler = async (e) =>{
      e.preventDefault();
      document.querySelector('#pay_btn').disabled = true;
      let res;
      try {
        const config = {
          headers: {
            'content-Type': 'application/json'
          }
        }

        res = await axios.post('/api/v1/payment/procces',paymentData,config);
        const clientSecret = res.data.client_secret;
        if(!stripe || !elements){
          return;
        }
        const result = await stripe.confirmCardPayment(clientSecret,{
          payment_method:{
            card: elements.getElement(CardNumberElement),
            billing_details:{
              name: user.nombre,
              email: user.email
            }
          }
        });
        
        if(result.error){
          alert.error(result.error.message)
          document.querySelector('#pay_btn').disabled = false;
        }
        else{
          if(result.paymentIntent.status === 'succeeded'){
            const order = {
              order_item: cartItems.map(item => ({
                  nombre: item.nombre,
                  cantidad: item.quantity,
                  imagen: item.imagen,
                  precio: item.precio,
                  modelProduct: item.product
              })),
              informacion_compras,
              informacion_pago: {
                  id: result.paymentIntent.id,
                  status: result.paymentIntent.status
              },
              precio_articulo: orderInfo.itemPrice,
              impuesto_articulo: orderInfo.taxprice,
              precio_envio: orderInfo.shoppingPrice,
              precio_total: orderInfo.totalPrice,
              precio_compra: orderInfo.itemPrice,
              estado_orden: "procesando",
              user: user._id,
              pagar_en: new Date().toISOString()
          };
          alert.success('venta completada con exito')
          dispatch(createOrders(order));
            navigate('/orders/me')
          }else{
            alert.error('este pago no se esta procesando')
          }
        }

      } catch (error) {
        document.querySelector('#pay_btn').disabled = false;
        alert.error(error.response.data)
      }
  }
    
  return (
   <Fragment>
        <MetaData title={'pago'} />
        <CheckoutSteps shopping confirmOrder payment />
        <div className="row wrapper">
		<div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-4">informacion de tarjeta </h1>
                <div className="form-group">
                  <label htmlFor="card_num_field">numero de tarjeta</label>
                  <CardNumberElement
                    type="text"
                    id="card_num_field"
                    className="form-control"
                    options={options}
                  />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_exp_field">fecha de expiracion</label>
                  <CardExpiryElement
                    type="text"
                    id="card_exp_field"
                    className="form-control"
                    options={options}
                  />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_cvc_field">CVC</label>
                  <CardCvcElement
                    type="text"
                    id="card_cvc_field"
                    className="form-control"
                    options={options}
                  />
                </div>
      
            
                <button
                  id="pay_btn"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  Pagar {`- ${orderInfo && orderInfo.totalPrice}`}
                </button>
    
              </form>
			  </div>
        </div>
   </Fragment>
  )
}

export default Payment
