import axios from "axios";
import { LOGIN_REQUEST,
     LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERROS, 
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCES,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCES,
    LOGOUT_USER_SUCCES,
    LOGOUT_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCES,
    UPDATE_USER_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCES,
    UPDATE_PASSWORD_FAIL,
    LOAD_USER_FAIL} from "../constans/userConstans"; 


export const login = (email,password) => async (dispatch) =>{
    try {
        dispatch({type: LOGIN_REQUEST})
        const config = {
            headers:{
                'content-Type': 'application/json'
            }
        }

        const {data}  = await axios.post('/api/v1/login',{email,password},config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}


export const register = (userData) => async (dispatch) =>{
    try {
        dispatch({type: REGISTER_USER_REQUEST})
        const config = {
            headers:{
                'content-Type': 'application/json'
            }
        }

        const {data}  = await axios.post('/api/v1/register',userData,config)

        dispatch({
            type: REGISTER_USER_SUCCES,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const loadUser = () => async (dispatch) =>{
    try {
        dispatch({type: LOAD_USER_REQUEST})


        const {data}  = await axios.get('/api/v1/profile')

        dispatch({
            type: LOAD_USER_SUCCES,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const logout = () => async (dispatch) =>{
    try {


        await axios.get('/api/v1/logout')

        dispatch({
            type: LOGOUT_USER_SUCCES,
        })
    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const updateProfile = (userData) => async (dispatch) =>{
    try {
        dispatch({type: UPDATE_USER_REQUEST})
        const config = {
            headers:{
                'content-Type': 'application/json'
            }
        }

        const {data}  = await axios.put('/api/v1/profile/update',userData,config)

        dispatch({
            type: UPDATE_USER_SUCCES,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updatePassword= (passwords) => async (dispatch) =>{
    console.log(passwords);
    try {
        dispatch({type: UPDATE_PASSWORD_REQUEST})
        const config = {
            headers:{
                'content-Type': 'application/json'
            }
        }

        const {data}  = await axios.put('/api/v1/update/password',passwords,config)

        dispatch({
            type: UPDATE_PASSWORD_SUCCES,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}




export const clearErros = () =>async(disptach)=>{
    disptach({
        type: CLEAR_ERROS
    })
    }
    