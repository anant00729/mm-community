import axios from 'axios';
import { 
  GET_HOME_USER_STORIES,
  CLEAR_ALL_HOME_STORIES } from './types';
import { setAlert } from './alert'


// getAllMembers
export const getUserStories = (token = '-1') => async dispatch => {
  dispatch({type : CLEAR_ALL_HOME_STORIES})
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ token });
    const res = await axios.post('/v1/story/getUserStories', body , config);
    const res_d = res.data

    if(res_d.status){
      dispatch({
        type: GET_HOME_USER_STORIES,
        payload: res_d.data
      });
      //dispatch(setAlert(JSON.stringify(res_d.data), 'green'))
    }else {
      dispatch(setAlert(res_d.message, 'red'))
    }
  } catch (err) {
    dispatch(setAlert(err.message , 'red'))
  }
};
