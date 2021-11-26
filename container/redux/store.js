import { createStore, combineReducers, applyMiddleware } from 'redux';

import login from './reducer/login';


const reducers = combineReducers({
    logindetail: login
})

const store = createStore(
    reducers
    
)

export default store;