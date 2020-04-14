import axios from 'axios';
import { LOGIN_SUCCESS, REGISTER_SUCCESS } from './types';
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
        payload: res_d.data
      });
    }else {
      dispatch(setAlert(res_d.message, 'red'))
    }
  } catch (err) {
    dispatch(setAlert(err.message))
  }
};



// login User
export const register = (email, password) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ email, password });
    const res = await axios.post('/v1/auth/register', body , config);
    const res_d = res.data

    if(res_d.status){
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res_d.data
      });
    }else {
      dispatch(setAlert(res_d.message, 'red'))
    }
  } catch (err) {
    dispatch(setAlert(err.message))
  }
};
