import React,{Fragment,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import {MDBDataTable} from 'mdbreact'
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye } from '@fortawesome/free-solid-svg-icons';
import { myOrders,clearErros } from '../../actions/orderActions'
const ListOrder = () => {
const alert =useAlert();
const dispatch = useDispatch();
const {loading,error,orders} = useSelector(state => state.myOrders )

useEffect(()=>{
    dispatch(myOrders())
    if(error){
        alert.error(error);
        dispatch(clearErros())
    }
},[dispatch,alert,error])

const setOrders = () =>{
    const data = {
        columns: [
            {
                label: 'Order ID',
                field: 'id',
                sort: 'asc'
            },
            {
                label: 'numero de items',
                field: 'numOfItems',
                sort: 'asc'
            },
            {
                label: 'Status',
                field: 'status',
                sort: 'asc'
            },
            {
                label: 'cantidad',
                field: 'amount',
                sort: 'asc'
            },
            {
                label: 'Accion',
                field: 'accion',
                sort: 'asc'
            }
        ],
        rows: []
    }
    orders.forEach(orden => {
        data.rows.push({
            id: orden._id,
            numOfItems: orden.order_item.length,
            amount: `$${orden.precio_total}`,
            status: orden.estado_orden && String(orden.estado_orden).includes('entregado')
                ? <p style={{color: 'green'}}>{orden.estado_orden}</p>
                : <p style={{color: 'red'}}>{orden.estado_orden}</p>,
                accion: 
                <Link to={`/order/${orden._id}`} className='btn btn-primary'>
        <FontAwesomeIcon icon={faEye} /> Ver Orden
      </Link>
        })
    });

    return data;
}
  return (
    <Fragment>
        <MetaData title={'mis ordenes'} />
        <h1 className='mt-5'>Mis ordenes</h1>
        {loading? <Loader />: (
            <MDBDataTable 
            data={setOrders()}
            className=''
            bordered
            striped
            hover

            />
        )}
    </Fragment>
  )
}

export default ListOrder
