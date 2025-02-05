import {ALL_PRODUCTS_REQUEST,ALL_PRODUCTS_SUCCESS,ALL_PRODUCTS_FAIL,CLEAR_ERROS,
PRODUCTS_DETAIL_REQUEST,PRODUCTS_DETAIL_SUCCESS,PRODUCTS_DETAIL_FAIL,
NEW_REVIEW_REQUEST,NEW_REVIEW_SUCCESS,NEW_REVIEW_RESET,NEW_REVIEW_FAIL,
ADMIN_PRODUCTS_REQUEST,ADMIN_PRODUCTS_SUCCESS,ADMIN_PRODUCTS_FAIL
} from '../constans/productConstans'
export const productReducers = (state = {products:[]},action)=>{

    switch (action.type) {     
        case ALL_PRODUCTS_REQUEST:
            case ADMIN_PRODUCTS_REQUEST:
            return{
                loading: true,
                products: []
            }

        case ALL_PRODUCTS_SUCCESS:
            return{
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount,
                resPerPage: action.payload.resPerPage,
                filteredProductCount: action.payload.filteredProductCount
            }

            case ADMIN_PRODUCTS_SUCCESS:

                return{
                    loading: false,
                    products: action.payload
                }

        case ALL_PRODUCTS_FAIL:
            case ADMIN_PRODUCTS_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case CLEAR_ERROS:
            return{
                ...state,
                error: null
            }
        
        default:
            return state;
    }
}
export const productDetailReducer =(state={product:{}},action)=>{
switch (action.type) {
    case PRODUCTS_DETAIL_REQUEST:
        return{
            ...state,
            loading: true
        };
    case PRODUCTS_DETAIL_SUCCESS:
        return{
            loading: false,
            product: action.payload
        }
    case PRODUCTS_DETAIL_FAIL:
        return{
            ...state,
            error: action.payload
        }
    
    case CLEAR_ERROS:
            return{
                ...state,
                error: null
            }

    default:
        return state;
}
}

export const newReviewReducer =(state={},action)=>{
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return{
                ...state,
                loading: true
            };
        case NEW_REVIEW_SUCCESS:
            return{
                loading: false,
                success: action.payload
            }
        case NEW_REVIEW_FAIL:
            return{
                ...state,
                error: action.payload
            }

            case NEW_REVIEW_RESET:
                return{
                    ...state,
                    success: false
                }
        
        case CLEAR_ERROS:
                return{
                    ...state,
                    error: null
                }
    
        default:
            return state;
    }
    }