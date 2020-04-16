import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import {HOME_ROUTE} from '../../utils/constants';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const HomeFeed = ({isAuthenticated}) => {
  if(!isAuthenticated){
    return <Redirect to={HOME_ROUTE}/>;
  }
  return (
    <div>
      <h1>Welcome to Home Page</h1>      
    </div>
  )
}

HomeFeed.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(HomeFeed);


