import axios from 'axios';
import { 
  GET_HOME_USER_STORIES,
  CLEAR_ALL_HOME_STORIES,
  ON_HOME_MENU_CHANGE,
  ON_PUBLISH_REQ_TAB_CHANGE
 } from './types';
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

export const onHomeMenuChange = (index = 0) => async dispatch => {
  dispatch({type : ON_HOME_MENU_CHANGE, payload : index})
}

export const onPublishReqTabChange = (tabName) => async dispatch => {
  dispatch({type : ON_PUBLISH_REQ_TAB_CHANGE, payload : tabName})
}


