import {
  GET_HOME_USER_STORIES,
  CLEAR_ALL_HOME_STORIES,
  ON_HOME_MENU_CHANGE,
  ON_PUBLISH_REQ_TAB_CHANGE
} from '../actions/types';

import {ALL_HOME_FEEDS, USER_STORY_LIST, USER_PENDING_STORY_LIST,OPEN,CLOSED} from '../components/utils/constants'

const initialState = {
  homeUserStoryList : [],
  homeUserLeftMenu : [
    {
      type : ALL_HOME_FEEDS,
      value : 'Daily Feeds',
      visible : 'all',
      selected : false       
    },
    {
      type : USER_STORY_LIST,
      value : 'My Stories',
      visible : 'all',
      selected : false       
    },
    {
      type : USER_PENDING_STORY_LIST,
      value : 'Publish Request',
      visible : 'all' ,
      selected : true ,
      requests : [
        {
          type : OPEN,
          selected : true
        },
        {
          type : CLOSED,
          selected : false
        }
      ]     
    }
  ]
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
    case ON_HOME_MENU_CHANGE:
      let newhomeUserLeftMenu = state.homeUserLeftMenu.map((data, dataIndex) => {
        data.selected = dataIndex == payload
        return data
      })
      
      return {
        ...state,
        homeUserLeftMenu : newhomeUserLeftMenu
      };            
    case ON_PUBLISH_REQ_TAB_CHANGE:
      let pubHomeUserLeftMenu = [...state.homeUserLeftMenu]
      let requests = pubHomeUserLeftMenu[2].requests.filter(menu => {
        menu.selected = menu.type === payload
        return menu
      })
      pubHomeUserLeftMenu[2].requests = requests
      return {
        ...state,
        homeUserLeftMenu : pubHomeUserLeftMenu
      };            
    default:
      return state;
  }
}
