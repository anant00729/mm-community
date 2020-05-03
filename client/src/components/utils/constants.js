export const OPEN_APPBAR_DROPDOWN = 'OPEN_APPBAR_DROPDOWN'
export const CLOSE_APPBAR_DROPDOWN = 'CLOSE_APPBAR_DROPDOWN'


// All routes
export const SEARCH_ROUTE = '/search'
export const HOME_ROUTE = '/'
export const HOME_FEED_ROUTE = '/home-feeds'
export const ALL_MEMBERS_ROUTE = '/all-members'
export const LOGIN_ROUTE = '/login'
export const REGISTER_ROUTE = '/register'
export const CREATE_STORY_ROUTE = '/create-story'
export const ABOUT_ROUTE = '/about'
export const ALL_STORIES_ROUTE = '/stories'
export const ALL_DISCUSSIONS = '/discussions'
export const SHOW_STORY = '/show-story'


export const IMAGE_BASE_URL = 'https://mm-blog-community.s3.ap-south-1.amazonaws.com/'


export const PARAGRAPH = 'Paragraph'
export const IMAGE = 'Image'
export const QUOTE = 'Quote'
export const SUBTITLE = 'Subtitle'
export const POINT = 'Point'


export const STUDENT = 'student'
export const TEACHER = 'teacher'

export const ALL_HOME_FEEDS = 'ALL_HOME_FEEDS'
export const USER_STORY_LIST = 'USER_STORY_LIST'
export const USER_PENDING_STORY_LIST = 'USER_PENDING_STORY_LIST'
export const ALL_STUDENT_PENDING_STORY_LIST = 'ALL_STUDENT_PENDING_STORY_LIST'


export const HOME_USER_LEFT_MENU = [
  {
    type : ALL_HOME_FEEDS,
    value : 'My Feeds',
    visible : 'all',
    selected : true       
  },
  {
    type : USER_STORY_LIST,
    value : 'My Stories',
    visible : 'all',
    selected : false       
  },
  {
    type : USER_PENDING_STORY_LIST,
    value : 'My Pending Story',
    visible : 'all' ,
    selected : false      
  },
  {
    type : ALL_STUDENT_PENDING_STORY_LIST,
    value : 'My Students Pending Stories',
    visible : 'all' ,
    selected : false      
  }
]

 

