import React from 'react';
import Register from '../usersite/login/Register';
import Login from '../usersite/login/Login';
import Alert from '../../components/common/Alert';
import { About } from '../usersite/about/About';
import { Stories } from '../usersite/stories/Stories';
import { PublishStory } from '../usersite/publishstory/PublishStory';
import { Members } from '../usersite/members/Members';
import {PageNotFound} from '../../../src/components/common/PageNotFound';
import Discussion from '../../../src/components/usersite/discusssion/Discussion';

import PrivateRoute from '../usersite/PrivateRoute';
import AppBar from '../common/AppBar'
import GuestHome from '../usersite/home/GuestHome'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  HOME_ROUTE,
  ALL_MEMBERS_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  CREATE_STORY_ROUTE,
  ABOUT_ROUTE,
  ALL_STORIES_ROUTE,
  ALL_DISCUSSIONS
} from '../../../src/components/utils/constants'


const Routes = props => {
  let isVisible = false
  switch(props.location.pathname){
    case HOME_ROUTE:
    case ABOUT_ROUTE:
    case ALL_MEMBERS_ROUTE:
    case ALL_STORIES_ROUTE:  
    case ALL_DISCUSSIONS:   
      isVisible = true
  }
  return (
    <div>
    {isVisible && <AppBar/>}
      <Switch>
          <Route exact path={HOME_ROUTE} component={GuestHome} />
          <Route exact path={LOGIN_ROUTE} component={Login} />
          <Route exact path={REGISTER_ROUTE} component={Register} />
          <Route exact path={ABOUT_ROUTE} component={About} />
          <Route exact path={ALL_MEMBERS_ROUTE} component={Members} />
          <Route exact path={ALL_STORIES_ROUTE} component={Stories} />
          <Route exact path={ALL_DISCUSSIONS} component={Discussion} />
          <Route exact path={CREATE_STORY_ROUTE} component={PublishStory} />
          <Route component={PageNotFound} />
      </Switch>
      <Alert />
    </div>
  );
};

export default Routes;
