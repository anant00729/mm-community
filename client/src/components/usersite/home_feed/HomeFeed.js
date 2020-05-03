import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HomeUserLeftMenu from './HomeUserLeftMenu';
import HomeUserRightMenu from './HomeUserRightMenu';
import HomeUserStoryItem from './adapter/HomeUserStoryItem'

import {
  HOME_ROUTE,
  ALL_HOME_FEEDS,
  USER_STORY_LIST,
  USER_PENDING_STORY_LIST,
  ALL_STUDENT_PENDING_STORY_LIST
} from '../../utils/constants'


const HomeFeed = ({isAuthenticated, user}) => {
  const [menuHidden , setMenuHidden] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  let [homeUserLeftMenu, setHomeUserLeftMenu] = useState(
    [
      {
        type : ALL_HOME_FEEDS,
        value : 'My Feeds',
        visible : 'all',
        selected : false       
      },
      {
        type : USER_STORY_LIST,
        value : 'My Stories',
        visible : 'all',
        selected : true       
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
  )

  let [selectedMenuItem, setSelectedMenuItem] = useState(homeUserLeftMenu[0])

  const onHomeMenuChange = (index) => {
    setHomeUserLeftMenu((homeUserLeftMenu)=>{
      let newhomeUserLeftMenu = homeUserLeftMenu.map((data, dataIndex) => {
        data.selected = dataIndex == index
        return data
      })
      setSelectedMenuItem(newhomeUserLeftMenu[index])
      return newhomeUserLeftMenu
    })
  }

  if(!isAuthenticated){
    return <Redirect to={HOME_ROUTE}/>;
  }

 

  return (
    <div className="md:px-16 px-6 px-2 bg-gray-200 min-h-screen pb-6">
      <div className="flex -mx-2 flex-wrap">
        <div className="w-full lg:w-1/5 px-2">
          <HomeUserLeftMenu
          setMenuHidden={setMenuHidden}
          menuHidden={menuHidden}
          user={user}
          onHomeMenuChange={onHomeMenuChange}
          homeUserLeftMenu={homeUserLeftMenu}
          />
        </div>
        <div className="w-full lg:w-3/5 px-2 mt-4 lg:mt-0">
        {/* <div className="h-4 w-full"></div> */}
          <HomeUserStoryItem
          selectedMenuItem={selectedMenuItem}
          />
        </div>
        <div className="w-full lg:w-1/5 px-2 mt-4 lg:mt-0">
          <div className="sticky top-app-bar-mdd">
            <HomeUserRightMenu/>
          </div>
        </div>
      </div>
    </div>

  )
}

HomeFeed.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(HomeFeed);


