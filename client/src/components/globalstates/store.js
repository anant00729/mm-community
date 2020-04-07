import { createStore, applyMiddleware , compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'

const initialState = {}

const middelware = [thunk]



const store = createStore(rootReducer, initialState , applyMiddleware(...middelware))


// const store = createStore(rootReducer, initialState ,
// compose(
//     applyMiddleware(...middelware), 
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// )


export default store