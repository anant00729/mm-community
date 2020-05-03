import {
  GET_HOME_USER_STORIES,
  CLEAR_ALL_HOME_STORIES
} from '../actions/types';

const initialState = {
  homeUserStoryList : []
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
        homeUserStoryList : []
      };            
    default:
      return state;
  }
}
