import React, { useState, useEffect } from 'react'
import { Link, Redirect, withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HomeUserStoryItem from '../../usersite/home_feed/adapter/HomeUserStoryItem'
import { v4 as uuidv4 } from 'uuid';
import {PUBLISHED, PENDING , HOME_FEED_ROUTE, PUBLISH_REQUEST} from '../../utils/constants'

function PublishRequest({location}) {
  
  let pub_req_path = `${HOME_FEED_ROUTE}${PUBLISH_REQUEST}`

  let path = location.pathname
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <div>
      <div className="bg-white rounded md:mt-0 flex flex-wrap text-sm text-gray-700 sticky top-story-data">
          <div className="w-full h-4 bg-gray-200"></div>
        <Link
        to={`${pub_req_path}${PENDING}`}
        key={'PENDING'}
        className={`px-4 h-10 flex ${path === `${pub_req_path}${PENDING}` ? 'font-extrabold app-font-color border-b-2 app-border-bottom' : ''}`}>
          <span className="font-semibold self-center">PENDING</span>
        </Link>
        
        <Link
        to={`${pub_req_path}${PUBLISHED}`}
        className={`px-4 h-10 flex ${path === `${pub_req_path}${PUBLISHED}` ? 'font-extrabold app-font-color border-b-2 app-border-bottom' : ''}`}>
          <span className="font-semibold self-center">PUBLISHED</span>
        </Link>
        
      </div>
        <Route path={`${pub_req_path}${PENDING}`} component={HomeUserStoryItem} />
        <Route path={`${pub_req_path}${PUBLISHED}`} component={HomeUserStoryItem} />
    </div>
  )
}


PublishRequest.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(withRouter(PublishRequest));




