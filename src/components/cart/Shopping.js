import React,{Fragment,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { saveShoppingInfo } from '../../actions/cartActions'
import CheckoutSteps from './CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData'

const Shopping = () => {
  const navigate = useNavigate();
  const {informacion_compras} = useSelector(state => state.cart)
  const [direccion,setDireccion] = useState(informacion_compras.direccion)
  const[barrio,setBarrio] = useState(informacion_compras.barrio)
  const[telefono,setTelefono] = useState(informacion_compras.telefono)

  const dispatch = useDispatch();

  const submitHandler = (e) => {

    e.preventDefault();
    dispatch(saveShoppingInfo({direccion,barrio,telefono}))
    navigate('/confirm')
  }


  return (
      <Fragment>
        <MetaData title={'informacion de compra'} />
        <CheckoutSteps shopping />
           <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Informacion de compra</h1>
                        <div className="form-group">
                            <label for="address_field">direccion de domicilio</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"  
                                placeholder="direccion de domicilio"
                                value={direccion}
                                onChange={(e)=> setDireccion(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label for="city_field">barrio</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                placeholder="barrio"
                                value={barrio}
                                onChange={(e)=> setBarrio(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">celular</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                placeholder="celular"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
            </div>
      </Fragment>
  )
}

export default Shopping
