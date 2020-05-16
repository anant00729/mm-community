import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HomeUserLeftMenu from './HomeUserLeftMenu';
import HomeUserRightMenu from './HomeUserRightMenu';
import HomeUserStoryItem from './adapter/HomeUserStoryItem'
import PublishRequest from '../../usersite/publish_request/PublishRequest'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {DAILY_FEEDS , HOME_FEED_ROUTE , MY_STORIES, PUBLISH_REQUEST} from '../../utils/constants'

import {
  HOME_ROUTE,
  USER_PENDING_STORY_LIST
} from '../../utils/constants'


const HomeFeed = ({isAuthenticated, user}) => {
  const [menuHidden , setMenuHidden] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])



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
          />
        </div>
        <div className="w-full lg:w-3/5 px-2 mt-4 lg:mt-0">
          <Route path={`${HOME_FEED_ROUTE}${DAILY_FEEDS}`} component={HomeUserStoryItem} />
          <Route path={`${HOME_FEED_ROUTE}${MY_STORIES}`} component={HomeUserStoryItem} />
          <Route path={`${HOME_FEED_ROUTE}${PUBLISH_REQUEST}`} component={PublishRequest} />
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

const allActions = {
  
}

export default connect(mapStateToProps, allActions)(HomeFeed);


