import {
  ADD_STORY_CELL,
  REMOVE_IMAGE_CONTENT,
  REMOVE_STORY_CELL,
  UPDATE_DROPDOWN_CELL,
  INPUT_CHANGE_CELL,
} from '../actions/types';




const initialState = {
  singleStory: [
    {
      id: '10',
      selectType : 'Image',
      input : 'https://cdn.hashnode.com/res/hashnode/image/upload/v1587368646362/imngKh2-Q.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=format&q=60'
    },
    {
      id: '1',
      selectType : 'Paragraph',
      input : 'asdasddadas'
    },
    {
      id: '2',
      selectType : 'Quote',
      input : 'asdasddadas'
    },
    {
      id: '3',
      selectType : 'Image',
      input : 'https://2.bp.blogspot.com/-iNIWqYfZGVM/TxWQVXH-tQI/AAAAAAAALoM/f00JzI3GRWA/s1600/Hanuman-Powerful+wallpapers+%25285%2529.jpg'
    },
    {
      id: '4',
      selectType : 'Point',
      input : 'asdasddadas'
    },
    {
      id: '5',
      selectType : 'Subtitle',
      input : 'asdasddadas'
    },
    {
      id: '6',
      selectType : 'Subtitle',
      input : 'asdasddadas'
    }
  ],
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
