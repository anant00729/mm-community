import axios from 'axios';
import { LOGIN_SUCCESS, REGISTER_SUCCESS, LOGOUT } from './types';
import { setAlert } from './alert'


// login User
export const login = (email, password) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ email, password });
    const res = await axios.post('/v1/auth/login', body , config);
    const res_d = res.data

    if(res_d.status){
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res_d
      });
      //dispatch(setAlert(res_d.data, 'green'))
    }else {
      dispatch(setAlert(res_d.message, 'red'))
    }
  } catch (err) {
    dispatch(setAlert(err.message))
  }
};



// login User
export const register = (req) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify(req);
    const res = await axios.post('/v1/auth/register', body , config);
    const res_d = res.data

    console.log('res_d', res_d)

    if(res_d.status){
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res_d
      });
      //dispatch(setAlert(res_d.data, 'green'))
    }else {
      dispatch(setAlert(res_d.message, 'red'))
    }
  } catch (err) {
    dispatch(setAlert(err.message))
  }
};


// login User
export const logout = () => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({token : localStorage.getItem('token')});
    const res = await axios.post('/v1/auth/logout', body , config);
    const res_d = res.data

    console.log('res_d', res_d)

    if(res_d.status){
      dispatch({ type: LOGOUT });
      //dispatch(setAlert(res_d.data, 'green'))
    }else {
      dispatch(setAlert(res_d.message, 'red'))
    }
  } catch (err) {
    dispatch(setAlert(err.message))
  }
  
  
};



