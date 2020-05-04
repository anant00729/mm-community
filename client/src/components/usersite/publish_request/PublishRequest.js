import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HomeUserStoryItem from '../../usersite/home_feed/adapter/HomeUserStoryItem'

function PublishRequest({selectedMenuItem, onPublishRequestTabChange}) {
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  let menuJSX = selectedMenuItem.requests.map(req => {
    return (
      <button
      key={req.type}
      onClick={() => onPublishRequestTabChange(req.type)}
      className={`px-4 h-10 ${req.selected ? 'font-extrabold app-font-color border-b-2 app-border-bottom' : ''}`}>
        <span className="font-semibold">{req.type}</span>
      </button>
    )
  })

  return (
    <div>
      <div className="bg-white rounded md:mt-0 flex flex-wrap text-sm text-gray-700 sticky top-story-data">
          <div className="w-full h-4 bg-gray-200"></div>
          {menuJSX}
      </div>
      <HomeUserStoryItem selectedMenuItem={selectedMenuItem}/>
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

export default connect(mapStateToProps)(PublishRequest);




