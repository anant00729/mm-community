import axios from 'axios';
import { MENU_CHANGE } from './types';

// menu change
export const menuChange = (route_name) => async dispatch => {
  dispatch({
    type: MENU_CHANGE,
    payload: route_name
  });
};
