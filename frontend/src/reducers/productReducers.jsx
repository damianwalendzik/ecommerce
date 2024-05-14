import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
 } from '../constants/productConstants'
 import axios from 'axios'
 const { data } = await axios.get('http://127.0.0.1:8000/api/products/');

export const productListReducer = (state = {products: data}, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            console.log("1")
            return {loading: true, products:[]}
        case PRODUCT_LIST_SUCCESS:
            console.log("2")
            return {loading: false, products: action.payload}
        case PRODUCT_LIST_FAIL:
            console.log("3")
            return {loading: false, error: action.payload}
        
        default:
            return state
    }
}