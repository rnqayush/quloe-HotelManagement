import {
    LOGIN
} from '../constants'


export const login = (payload) => {
    return {
        type: LOGIN,
        payload
    }
}