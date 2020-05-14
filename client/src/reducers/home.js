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
      selected : false,
      code: '/home-feeds/one'       
    },
    {
      type : USER_STORY_LIST,
      value : 'My Stories',
      visible : 'all',
      selected : false,
      code: '/home-feeds/two'           
    },
    {
      type : USER_PENDING_STORY_LIST,
      value : 'Publish Request',
      visible : 'all',
      selected : true,
      code: '/home-feeds/publish-request',
      requests : [
        {
          type : OPEN,
          selected : true,
          code: '/home-feeds/publish-request/open'
        },
        {
          type : CLOSED,
          selected : false,
          code : '/home-feeds/publish-request/closed'
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
    default:
      return state;
  }
}
