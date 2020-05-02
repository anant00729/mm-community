import axios from 'axios';
import { GET_ALL_MEMBERS } from './types';
import { setAlert } from './alert'


// getAllMembers
export const getAllMembers = (type = 'student') => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ type });
    const res = await axios.post('/v1/auth/getAllUsers', body , config);
    const res_d = res.data

    if(res_d.status){
      dispatch({
        type: GET_ALL_MEMBERS,
        payload: res_d.data
      });
      //dispatch(setAlert(res_d.data, 'green'))
    }else {
      dispatch(setAlert(res_d.message, 'red'))
    }
  } catch (err) {
    dispatch(setAlert(err.message))
  }
};
