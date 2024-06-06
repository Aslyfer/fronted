import React,{Fragment,useEffect} from 'react'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getaAdminProducts } from '../../actions/productActions'
import Sidebar from './Sidebar'
const Dashboard = () => {
    const {products} = useSelector(state => state.products )
    const dispatch = useDispatch();
    let outStock = 0;
    products.forEach(product => {
        if(product.stock === 0){
            outStock += 1;

        }
    });
    useEffect(()=>{
        dispatch(getaAdminProducts())
    },[dispatch])
  return (
  <Fragment>
    <div className='row'>
    <div className='col-12 col-md-2'>
    <Sidebar />
    </div>
    <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>
                            <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Total Amount<br /> <b>$4567</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Productos<br /> <b>{products && products.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Orders<br /> <b>125</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Users<br /> <b>45</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" href="/admin/users">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Fuera de Stock<br /> <b>{outStock}</b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </div>
    </div>
  </Fragment>
  )
}

export default Dashboard
