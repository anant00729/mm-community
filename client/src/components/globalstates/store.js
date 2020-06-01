import { createStore, applyMiddleware , compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../../reducers'
import setAuthToken from '../../util/setAuthToken';

const initialState = {}

const middelware = [thunk]

const store = createStore(rootReducer, initialState , applyMiddleware(...middelware))

// const store = createStore(rootReducer, initialState ,
// compose(
//     applyMiddleware(...middelware), 
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// )


// set up a store subscription listener
// to store the users token in localStorage

// prevent auth error on first run of subscription
let currentState = {
    auth: { token: null, isAuthenticated: null, loading: true, user: null }
};
store.subscribe(() => {
    // keep track of the previous and current state to compare changes
    let previousState = currentState;
    currentState = store.getState();
    // if the token changes set the value in localStorage and axios headers
    if (previousState.auth.token !== currentState.auth.token) {
      const token = currentState.auth.token;
      setAuthToken(token);
    }
});



export default store