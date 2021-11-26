import {
    LOGIN
} from '../constants';

/* const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return [...state, action.payload]
        case REMOVE_FROM_CART:
            return state.filter(cartItem => cartItem !== action.payload)
        case CLEAR_CART:
            return state = []
    }
    return state;
} */

const login =(state=[],action)=>{
    switch(action.type){
        case LOGIN:
            return action.payload.data    }
    return state
}
export default login;



