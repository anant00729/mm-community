import { OPEN_APPBAR_DROPDOWN , CLOSE_APPBAR_DROPDOWN} from '../../utils/constants' 
const initailState = {
  open_appbar : ''
}



 export default function(state = initailState , action){
  switch(action.type){
      case OPEN_APPBAR_DROPDOWN:
        return {
          ...state
        }
      case CLOSE_APPBAR_DROPDOWN:
      return {
        ...state
      }
      default:
        return state
      }
  }