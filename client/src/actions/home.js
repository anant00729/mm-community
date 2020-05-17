import axios from 'axios';
import { 
  GET_HOME_USER_STORIES,
  CLEAR_ALL_HOME_STORIES
 } from './types';
import { setAlert } from './alert'


// getAllMembers
export const getUserStories = (token = '-1', story_status = 0) => async dispatch => {
  dispatch({type : CLEAR_ALL_HOME_STORIES})
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ token });
    let res 
    if(story_status == 0){
      res = await axios.post('/v1/story/getUserStories', body , config);
    }else if(story_status == 2) {
      res = await axios.post('/v1/story/getAllStories', body , config);
    }
    
    
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

export const getAdminStories = (token = '-1', story_status = 0) => async dispatch => {
  dispatch({type : CLEAR_ALL_HOME_STORIES})
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ token, story_status });
    const res = await axios.post('/v1/story/getAllAdminStories', body , config);
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

