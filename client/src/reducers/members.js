import {
  GET_ALL_MEMBERS
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
    default:
      return state;
  }
}
