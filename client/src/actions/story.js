import axios from 'axios';
import { 
  ADD_STORY_CELL,
  REMOVE_IMAGE_CONTENT,
  REMOVE_STORY_CELL,
  UPDATE_DROPDOWN_CELL,
  INPUT_CHANGE_CELL,
  PUBLISH_STORY
 } from './types';
import { setAlert } from './alert'



// login User
export const addStoryCell = (obj) => async dispatch => {
  dispatch({
    type: ADD_STORY_CELL,
    payload: obj
  });
};


// login User
export const removeImageContent = (obj) => async dispatch => {
  dispatch({
    type: REMOVE_IMAGE_CONTENT,
    payload: obj
  });
};


// login User
export const removeStoryCell = (obj) => async dispatch => {
  dispatch({
    type: REMOVE_STORY_CELL,
    payload: obj
  });
};


export const updateDropDownCell = (obj) => async dispatch => {
  dispatch({
    type: UPDATE_DROPDOWN_CELL,
    payload: obj
  });
};


export const inputChannelCell = (obj) => async dispatch => {
  dispatch({
    type: INPUT_CHANGE_CELL,
    payload: obj
  });
};



export const callInsertStory = (obj) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify(obj);
    const res = await axios.post('/v1/story/addStory', body , config);
    const res_d = res.data

    if(res_d.status){
      dispatch({
        type: PUBLISH_STORY,
        payload: res_d
      });
      //dispatch(setAlert(res_d.data, 'green'))
    }else {
      dispatch(setAlert(res_d.message, 'red'))
    }
  } catch (err) {
    dispatch(setAlert(err.message, 'red'))
  }
};



export const uploadImage = (image, type) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({image, type});
    const res = await axios.post('/v1/story/addStory', body , config);
    const res_d = res.data

    if(res_d.status){
      dispatch({
        type: PUBLISH_STORY,
        payload: res_d
      });
      //dispatch(setAlert(res_d.data, 'green'))
    }else {
      dispatch(setAlert(res_d.message, 'red'))
    }
  } catch (err) {
    dispatch(setAlert(err.message, 'red'))
  }
};
