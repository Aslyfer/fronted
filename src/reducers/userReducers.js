import { LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,
    REGISTER_USER_REQUEST,REGISTER_USER_SUCCES,REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,LOAD_USER_SUCCES,LOAD_USER_FAIL,LOGOUT_USER_SUCCES,LOGOUT_USER_FAIL,
    UPDATE_USER_REQUEST,UPDATE_USER_SUCCES,UPDATE_USER_FAIL,
    UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_SUCCES,UPDATE_PASSWORD_RESET,UPDATE_PASSWORD_FAIL,UPDATE_USER_RESET,
    CLEAR_ERROS } from '../constans/userConstans'

export const authReducers = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case LOGOUT_USER_SUCCES:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null
            }

        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCES:
        case LOAD_USER_SUCCES:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case LOAD_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case LOGOUT_USER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERROS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const userReducers = (state = { user: {} }, action) =>{
    switch (action.type) {
        case UPDATE_USER_REQUEST:
            case UPDATE_PASSWORD_REQUEST:
            return{
                ...state,
                loading: true
            }

            case UPDATE_USER_SUCCES:
                case UPDATE_PASSWORD_SUCCES:
                return{
                    ...state,
                    loading: false,
                    isUpdated: action.payload
                }

                case UPDATE_USER_RESET:
                    case UPDATE_PASSWORD_RESET:
                    return{
                        ...state,
                        isUpdated: false
                    }

                case UPDATE_USER_FAIL:
                    case UPDATE_PASSWORD_FAIL:
                    return{
                        ...state,
                        loading: false,
                        error: action.payload
                    }

                    case CLEAR_ERROS:
                        return {
                            ...state,
                            error: null
                        }
    
        default:
            return state;
    }
}
