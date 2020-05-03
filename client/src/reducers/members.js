import {
  GET_ALL_MEMBERS,
  CLEAR_ALL_MEMBERS
} from '../actions/types';

const initialState = {
  homeMemberList : []
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    
    case GET_ALL_MEMBERS:
      return {
        ...state,
        homeMemberList : payload
      };

    case CLEAR_ALL_MEMBERS:
      return {
        ...state,
        homeMemberList : []
      };            
    default:
      return state;
  }
}
