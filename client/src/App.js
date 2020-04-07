import React from 'react';
import AppBar from './components/common/AppBar'
import GuestHome from '../src/components/usersite/home/GuestHome'
import {Login} from '../src/components/usersite/login/Login'
import {Stories} from '../src/components/usersite/stories/Stories'
import {Members} from '../src/components/usersite/members/Members'
import {PageNotFound} from '../src/components/common/PageNotFound'
import {About} from '../src/components/usersite/about/About'



import store from './components/globalstates/store'
import { Provider } from 'react-redux'

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="w-full h-screen">
        <AppBar/>
        <About/>
        <Stories/>
        <Members/>
        <GuestHome/>
        <Login/>
        <PageNotFound/>
      </div>
    </Provider>
  );
}

export default App;
