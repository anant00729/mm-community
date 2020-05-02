import axios from 'axios';
import { 
  ADD_STORY_CELL,
  REMOVE_IMAGE_CONTENT,
  REMOVE_STORY_CELL,
  UPDATE_DROPDOWN_CELL,
  INPUT_CHANGE_CELL,
  PUBLISH_STORY,
  ADD_POSTER_IMAGE,
  POSTER_IMAGE_FAILED,
  POSTER_IMAGE_LOADING,
  ADD_STORY_IMAGE,
  STORY_IMAGE_LOADING,
  STORY_IMAGE_FAILED,
  GET_POPULAR_STORY
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
      dispatch(setAlert(res_d.data, 'green'))
    }else {
      dispatch(setAlert(res_d.message, 'red'))
    }
  } catch (err) {
    dispatch(setAlert(err.message, 'red'))
  }
};



export const uploadImageBanner = (file,type) => async dispatch => {

  try {
    dispatch({type : POSTER_IMAGE_LOADING})
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    const formData = new FormData()
    formData.append('image', file)
    formData.append('type', type)
    const res = await axios.post('/v1/image/uploadImage', formData, config);
    const res_d = res.data

    if(res_d.status){
      dispatch({
        type: ADD_POSTER_IMAGE,
        payload: res_d.image_path
      });
    }else {
      dispatch(setAlert(res_d.message, 'red'))
      dispatch({type: POSTER_IMAGE_FAILED});
    }
  } catch (err) {
    dispatch(setAlert(err.message, 'red'))
    dispatch({type: POSTER_IMAGE_FAILED});
  }
};



export const uploadImage = (file,type,index) => async dispatch => {

  try {
    dispatch({type : STORY_IMAGE_LOADING, payload : index})
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    const formData = new FormData()
    formData.append('image', file)
    formData.append('type', type)
    const res = await axios.post('/v1/image/uploadImage', formData, config);
    let res_d = res.data
    res_d.index = index

    console.log('res_d.index :>> ', res_d);

    if(res_d.status){
      dispatch({
        type: ADD_STORY_IMAGE,
        payload: res_d
      });
    }else {
      dispatch(setAlert(res_d.message, 'red'))
      dispatch({type: STORY_IMAGE_FAILED});
    }
  } catch (err) {
    dispatch(setAlert(err.message, 'red'))
    dispatch({type: STORY_IMAGE_FAILED});
  }
};


export const getAllStories = () => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const obj = {
      isForUser: true
    }
    const body = JSON.stringify(obj);
    const res = await axios.post('/v1/story/getAllStories', body , config);
    const res_d = res.data

    if(res_d.status){
      dispatch({
        type: GET_POPULAR_STORY,
        payload: res_d.data
      });
      
      
      //dispatch(setAlert(JSON.stringify(res_d.data), 'green'))
    }else {
      dispatch(setAlert(res_d.message, 'red'))
    }
  } catch (err) {
    dispatch(setAlert(err.message, 'red'))
  }
}