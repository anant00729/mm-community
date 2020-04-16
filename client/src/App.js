import React, {useEffect} from 'react';
import Routes from '../src/components/usersite/Routes'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './components/globalstates/store'
import { Provider } from 'react-redux'
import './App.css';
import setAuthToken from '../src/util/setAuthToken';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory()

function App() {
  useEffect(() => {
    console.log('localStorage.token :', localStorage.token);
    setAuthToken(localStorage.token);
  }, []);
  return (
    <Provider store={store}>
      <div className="w-full min-h-screen">
        <Router history={history}>
          <Route component={Routes} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
