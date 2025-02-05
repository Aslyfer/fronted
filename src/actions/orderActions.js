import axios from "axios";
import {
    CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS,CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,MY_ORDERS_SUCCESS,MY_ORDERS_FAIL,CLEAR_ERROS,
    ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_FAIL,
 } from "../constans/orderConstans"; 


export const createOrders = (order) => async (dispatch,getState) =>{
    console.log(order)
    try {
        dispatch({type: CREATE_ORDER_REQUEST})
        const config = {
            headers:{
                'content-Type': 'application/json'
            }
        }

        const {data}  = await axios.post('/api/v1/new/order', order,config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const myOrders = () => async (dispatch) =>{
    try {
        dispatch({type: MY_ORDERS_REQUEST})


        const {data}  = await axios.get('/api/v1/orders/me')

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders
        })
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch) =>{
    try {
        dispatch({type: ORDER_DETAILS_REQUEST})


        const {data}  = await axios.get(`/api/v1/order/${id}`)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}



export const clearErros = () =>async(disptach)=>{
    disptach({
        type: CLEAR_ERROS
    })
    }
    