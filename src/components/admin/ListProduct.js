import React,{Fragment,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import {MDBDataTable} from 'mdbreact'
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash,faEye } from '@fortawesome/free-solid-svg-icons';
import { getaAdminProducts,clearErros } from '../../actions/productActions'
import Sidebar from './Sidebar'
const ListProduct = () => {
    const alert =useAlert();
const dispatch = useDispatch();
const {loading,error,products} = useSelector(state => state.products )

useEffect(()=>{
    dispatch(getaAdminProducts())
    if(error){
        alert.error(error);
        dispatch(clearErros())
    }
},[dispatch,alert,error])

const setProducts = () =>{
    const data = {
        columns: [
            {
                label: 'product ID',
                field: 'id',
                sort: 'asc'
            },
            {
                label: 'Nombre',
                field: 'nombre',
                sort: 'asc'
            },
            {
                label: 'Precio',
                field: 'precio',
                sort: 'asc'
            },
            {
                label: 'Stock',
                field: 'stock',
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
    products.forEach(product => {
        data.rows.push({
            id: product._id,
            nombre: product.nombre,
            precio: `$${product.precio}`,
            stock: product.stock,
            accion: <Fragment>
                <Link to={`/product/${product._id}`} className='btn btn-primary py-1 px-2'>
        <FontAwesomeIcon icon={faEye} /> Ver producto
      </Link>
      <button className='btn btn-danger py-1 px-2 ml-2'> <FontAwesomeIcon icon={faTrash} /> </button>
      </Fragment>

        })
    });

    return data;
}
  return (
    <Fragment>
        <MetaData title={'todos los productos'} />
        <div className='row'>
            <div className='col-12 col-md-2'>
                <Sidebar />

            </div>
            <div className='col-12 col-md-10'>
                <Fragment>
                    <h1 className='my-5'>Todos los productos</h1>
                    {loading ? <Loader /> : (
                         <MDBDataTable 
                         data={setProducts()}
                         className=''
                         bordered
                         striped
                         hover
                         />
                    )}
                </Fragment>
            </div>
        </div>
    </Fragment>
  )
}

export default ListProduct
