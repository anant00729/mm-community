import {
  GET_HOME_USER_STORIES,
  CLEAR_ALL_HOME_STORIES,
  ON_HOME_MENU_CHANGE,
  ON_PUBLISH_REQ_TAB_CHANGE
} from '../actions/types';



const initialState = {
  homeUserStoryList : null
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    
    case GET_HOME_USER_STORIES:
      return {
        ...state,
        homeUserStoryList : payload
      };

    case CLEAR_ALL_HOME_STORIES:
      return {
        ...state,
        homeUserStoryList : null
      };            
    default:
      return state;
  }
}
