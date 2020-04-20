import axios from 'axios';
import { 
  ADD_STORY_CELL,
  REMOVE_IMAGE_CONTENT,
  REMOVE_STORY_CELL,
  UPDATE_DROPDOWN_CELL,
  INPUT_CHANGE_CELL,
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
