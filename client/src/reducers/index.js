import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import story from './story';
import members from './members';
import home from './home';


export default combineReducers({
  alert,
  auth,
  profile,
  story,
  members,
  home
});
