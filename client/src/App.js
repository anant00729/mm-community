import React from 'react';
import AppBar from './components/common/AppBar'
import GuestHome from '../src/components/usersite/home/GuestHome'
import {Login} from '../src/components/usersite/login/Login'
import {Stories} from '../src/components/usersite/stories/Stories'
import {Members} from '../src/components/usersite/members/Members'
import {PageNotFound} from '../src/components/common/PageNotFound'
import {About} from '../src/components/usersite/about/About'
import {PublishStory} from '../src/components/usersite/publishstory/PublishStory'
import {AdminHome} from '../src/components/usersite/adminsumit/AdminHome'




import store from './components/globalstates/store'
import { Provider } from 'react-redux'
import Test from '../src/components/usersite/Test'
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="w-full h-screen">
        
        <AppBar/>
        <div className="absolute">
          <About/>
          <Stories/>
          <Members/>
          <GuestHome/>
          <Login/>
          <PageNotFound/>
          <PublishStory/>
        </div>
        
        {/* <AdminHome/> */}
        {/* <Test/> */}
      </div>
    </Provider>
  );
}

export default App;
