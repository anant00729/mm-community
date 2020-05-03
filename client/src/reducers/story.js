import {
  ADD_STORY_CELL,
  REMOVE_IMAGE_CONTENT,
  REMOVE_STORY_CELL,
  UPDATE_DROPDOWN_CELL,
  INPUT_CHANGE_CELL,
  ADD_POSTER_IMAGE,
  POSTER_IMAGE_LOADING,
  POSTER_IMAGE_FAILED,
  ADD_STORY_IMAGE,
  STORY_IMAGE_LOADING,
  STORY_IMAGE_FAILED,
  GET_POPULAR_STORY,
  CLEAR_STORY_CONTENT,
  GET_STORY_BY_ID,
  CLEAR_STORY_BY_ID
} from '../actions/types';




const initialState = {
  posterImage : {
    image : '',
    loading : false
  },
  popularStoryList : [],
  featuredStoryList : [],
  recentStoryList : [],
  singleStory: [],
  loading: true,
  error: {},
  showStoryById : {}
};

export default function(state = initialState, action) {
  let { type, payload } = action;
  let { singleStory } = state 

  switch (type) {
    case ADD_STORY_CELL:
      let { defaultValue , defaultIndex } = payload
      let updateList = [...singleStory]
      updateList.splice(defaultIndex, 0, defaultValue);
      return {
        ...state,
        singleStory: updateList,
        loading: false
      };
    case REMOVE_IMAGE_CONTENT:
      let { r_index } = payload
      singleStory[r_index].input = ''
      return {
        ...state,
        singleStory : [...singleStory],
        loading: false
      }
    case REMOVE_STORY_CELL:
      let removeUIndex  = payload
      let removedList = singleStory.filter((_, index) => index !== removeUIndex)  
      return {
        ...state,
        singleStory: removedList,
        loading: false
      };
    case UPDATE_DROPDOWN_CELL:
      let { dValue , dIndex } = payload
      if(singleStory[dIndex].selectType === 'Image' || dValue === 'Image'){
        singleStory[dIndex].input = ''
      }
      singleStory[dIndex].selectType = dValue
      return {
        ...state,
        singleStory: [...singleStory],
        loading: false
      };
    case INPUT_CHANGE_CELL:
      let { iValue , itemIndex } = payload
      singleStory[itemIndex].input = iValue
      return {
        ...state,
        singleStory: [...singleStory],
        loading: false
      };
    case ADD_POSTER_IMAGE:
      return {
        ...state,
        posterImage : {
          image : payload,
          error : '',
          loading : false
        }
      }
    case ADD_POSTER_IMAGE:
      return {
        ...state,
        posterImage : {
          image : payload,
          loading : false
        }
      }  
    case POSTER_IMAGE_LOADING:
      return {
        ...state,
        posterImage : {
          image : '',
          loading : true
        }
      }  
    case POSTER_IMAGE_FAILED:
      return {
        ...state,
        posterImage : {
          image : '',
          loading : false
        }
      }  

    case STORY_IMAGE_LOADING:
      let newSingleStory = [...state.singleStory]
      newSingleStory[payload].loading = true
      return {
        ...state,
        singleStory : newSingleStory
      }  
    case ADD_STORY_IMAGE:
      let _s1 = [...state.singleStory]
      _s1[payload.index].loading = false
      _s1[payload.index].input = payload.image_path
      return {
        ...state,
        singleStory : _s1
      }  

    case GET_POPULAR_STORY: 
      return {
        ...state,
        popularStoryList : payload
      }  

    case CLEAR_STORY_CONTENT:
      return {
        ...state, 
        posterImage : {
          image : '',
          loading : false
        },
        popularStoryList : [],
        featuredStoryList : [],
        recentStoryList : [],
        singleStory: [],
        loading: true,
        error: {}
      }  

    case GET_STORY_BY_ID: 
      return {
        ...state, 
        showStoryById : payload
      }  

    case CLEAR_STORY_BY_ID:
      return {
        ...state, 
        showStoryById : {}
      }      
    default:
      return state;
  }
}
