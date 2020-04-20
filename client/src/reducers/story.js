import {
  ADD_STORY_CELL,
  REMOVE_IMAGE_CONTENT,
  REMOVE_STORY_CELL,
  UPDATE_DROPDOWN_CELL,
  INPUT_CHANGE_CELL,
} from '../actions/types';

const initialState = {
  singleStory: [],
  loading: true,
  error: {}
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
    default:
      return state;
  }
}
