import {
  REGISTER_SUCCESS,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUNT_DELETED
} from '../actions/types';




const setAuthInitState = () => {
  let isAuthenticated = false
  if(localStorage.getItem('token')){
    isAuthenticated = true
  }

  return {
    token: localStorage.getItem('token'),
    isAuthenticated,
    loading: true,
    user: JSON.parse(localStorage.getItem('user'))
  }
}

export default function(state = setAuthInitState(), action) {
  const { type, payload } = action;

  switch (type) {
    
    case REGISTER_SUCCESS:
      localStorage.setItem('user', JSON.stringify(payload.user))
      return {
        ...state,
        token : payload.token,
        user : payload.user,
        isAuthenticated: true,
        loading: false
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(payload.user))
      return {
        ...state,
        token : payload.token,
        user : payload.user,
        isAuthenticated: true,
        loading: false
      };
    case ACCOUNT_DELETED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}
