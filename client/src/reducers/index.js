import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import story from './story';
import members from './members';


export default combineReducers({
  alert,
  auth,
  profile,
  story,
  members
});
