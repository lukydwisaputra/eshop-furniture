import axios from 'axios';
import { API_URL } from '../helper';

export const loginAction = (data) => {
    return {
        type: "LOGIN_SUCCESS", 
        payload: data
    }
}

export const loginMiddleware = (inputEmail, inputPassword) => {
    return async(dispatch) => {
        try {
            let res = await axios.post(API_URL + `/auth/login`, {
                inputEmail, inputPassword
            })
            localStorage.setItem('eshopLog', res.data.token);
            delete res.data.token;
            // console.log(res.data)
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const logoutAction = () => {
    return {
        type: "LOGOUT_SUCCESS"
    }
}

