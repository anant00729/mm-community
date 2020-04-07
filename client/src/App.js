import React from 'react';
import AppBar from './components/common/AppBar'
import GuestHome from '../src/components/usersite/home/GuestHome'
import {Login} from '../src/components/usersite/login/Login'
import {Stories} from '../src/components/usersite/stories/Stories'
import {Members} from '../src/components/usersite/members/Members'


import store from './components/globalstates/store'
import { Provider } from 'react-redux'

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="w-full h-screen">
        <AppBar/>
        <Stories/>
        <Members/>
        <GuestHome/>
        <Login/>
      </div>
    </Provider>
  );
}

export default App;
