import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HomeUserLeftMenu from './HomeUserLeftMenu';
import HomeUserRightMenu from './HomeUserRightMenu';
import HomeUserStoryItem from './adapter/HomeUserStoryItem'
import PublishRequest from '../../usersite/publish_request/PublishRequest'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import One from './One';
import Two from './Two';
import Three from './Three';

import {
  HOME_ROUTE,
  USER_PENDING_STORY_LIST
} from '../../utils/constants'


const HomeFeed = ({isAuthenticated, user, homeUserLeftMenu}) => {
  const [menuHidden , setMenuHidden] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])



  if(!isAuthenticated){
    return <Redirect to={HOME_ROUTE}/>;
  }

  // let homeMiddleComponentJSX = ''

  // homeMiddleComponentJSX = homeUserLeftMenu.find(menu=> {
  //   if(menu.selected){
  //     if(menu.type === USER_PENDING_STORY_LIST)  {
  //       menu.component = <Route path={'/home-feeds/one'} component={PublishRequest} />
  //       // <PublishRequest 
  //       // selectedMenuItem={menu} 
  //       // onPublishRequestTabChange={onPublishRequestTabChange}/>
  //       return menu
  //     }else {
  //       menu.component = <Route path={'/home-feeds/two'} component={Two} />
  //       return menu
  //     }
  //   }
  // })

  return (
    <div className="md:px-16 px-6 px-2 bg-gray-200 min-h-screen pb-6">
      <div className="flex -mx-2 flex-wrap">
        <div className="w-full lg:w-1/5 px-2">
          <HomeUserLeftMenu
          setMenuHidden={setMenuHidden}
          menuHidden={menuHidden}
          user={user}
          homeUserLeftMenu={homeUserLeftMenu}
          />
        </div>
        <div className="w-full lg:w-3/5 px-2 mt-4 lg:mt-0">
          <Route path={'/home-feeds/one'} component={HomeUserStoryItem} />
          <Route path={'/home-feeds/two'} component={HomeUserStoryItem} />
          <Route path={'/home-feeds/three'} component={PublishRequest} />
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
  user: PropTypes.object,
  onHomeMenuChange: PropTypes.func.isRequired,
  onPublishReqTabChange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  homeUserLeftMenu: state.home.homeUserLeftMenu
});

const allActions = {
  
}

export default connect(mapStateToProps, allActions)(HomeFeed);


