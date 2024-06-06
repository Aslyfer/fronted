import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useParams, Link } from 'react-router-dom';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import { getOrderDetails,clearErros } from '../../actions/orderActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const ListOrderDetails = () => {
    const alert = useAlert();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, error, order } = useSelector(state => state.orderDetails);

    useEffect(() => {
        dispatch(getOrderDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErros());
        }
    }, [dispatch, error, alert]);

    const isPaid = order?.informacion_pago?.status === "pagado";

    if (loading) {
        return <Loader />;
    }

    if (!order) {
        return <p>No se encontró la orden</p>;
    }

    return (
        <Fragment>
            <MetaData title={'Detalle de la Orden'} />
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-details">
                    <h1 className="my-5">Order # {order._id}</h1>

                    <h4 className="mb-4">Shipping Info</h4>
                    <p><b>Name:</b> {order.user?.nombre}</p>
                    <p><b>Phone:</b> {order.informacion_compras?.telefono}</p>
                    <p className="mb-4"><b>direccion:</b> {order.informacion_compras?.direccion}</p>
                    <p className="mb-4"><b>Barrio:</b> {order.informacion_compras?.barrio}</p>
                    <p><b>Amount:</b> ${order.precio_total}</p>

                    <hr />

                    <h4 className="my-4">Payment</h4>
                    <p className={isPaid ? "greenColor" : "redColor"}><b>
                        {isPaid ? "pagado" : "no pagado"}</b></p>

                    <h4 className="my-4">Order Status:</h4>
                    <p className={order.estado_orden?.includes('procesando') ? "greenColor" : "redColor"}><b>{order.estado_orden}</b></p>

                    <h4 className="my-4">Order Items:</h4>
                    <hr />
                    <div className="cart-item my-1">
                        {order.order_item?.map(item => (
                            <div key={item._id} className="row my-5">

                                <div className="col-4 col-lg-2">
                                    <img src={item.imagen} alt="" height="100" width="100" />
                                </div>
                                <div className="col-5 col-lg-5">
                                    <Link to={`/product/${item.modelProduct}`}> {item.nombre}
                                    </Link>
                                </div>
                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p>${item.precio}</p>
                                </div>
                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                    <p>{item.cantidad} Piece(s)</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr />
                </div>
            </div>
        </Fragment>
    );
}

export default ListOrderDetails;
