import axios from 'axios'

import {ALL_PRODUCTS_REQUEST
    ,ALL_PRODUCTS_SUCCESS
    ,ALL_PRODUCTS_FAIL
    ,PRODUCTS_DETAIL_REQUEST,
    PRODUCTS_DETAIL_SUCCESS,
    PRODUCTS_DETAIL_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCTS_REQUEST,ADMIN_PRODUCTS_SUCCESS,ADMIN_PRODUCTS_FAIL
    ,CLEAR_ERROS} from '../constans/productConstans';

export const getProducts = (keyword ='',currenPage = 1,precio,categoria) => async (disptach)=>{
    try {
        disptach({
            type: ALL_PRODUCTS_REQUEST
        })
        let link = `/api/v1/products?keyword=${keyword}&page=${currenPage}&precio[lte]=${precio[1]}&precio[gte]=${precio[0]}`;
        if(categoria){
            link = `/api/v1/products?keyword=${keyword}&page=${currenPage}&precio[lte]=${precio[1]}&precio[gte]=${precio[0]}&categoria=${categoria}`;
        }

        const {data} = await axios.get(link)
        disptach({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        disptach({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }

}


export const getProductDetail = (id) => async (disptach)=>{
    try {
        disptach({
            type: PRODUCTS_DETAIL_REQUEST
        })
        const {data} = await axios.get(`/api/v1/product/${id}`)

        disptach({
            type: PRODUCTS_DETAIL_SUCCESS,
            payload: data.products
        })
    } catch (error) {
        disptach({
            type: PRODUCTS_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }

}


export const getaAdminProducts = () => async (disptach)=>{
    try {
        disptach({
            type: ADMIN_PRODUCTS_REQUEST
        })
        const {data} = await axios.get(`/api/v1/admin/products`)

        disptach({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })
    } catch (error) {
        disptach({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }

}


export const newReview = (reviewData) => async (disptach)=>{
    console.log('Datos de la reseña:', reviewData); 
    try {
        disptach({
            type: NEW_REVIEW_REQUEST
        })

        const config = {
            headers:{
                'content-Type': 'application/json'
            }
        }
        const {data} = await axios.put('/api/v1/review',reviewData,config)

        disptach({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        disptach({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }

}



export const clearErros = () =>async(disptach)=>{
disptach({
    type: CLEAR_ERROS
})
}
