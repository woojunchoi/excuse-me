import {createStore, combineReducers, applyMiddleware} from 'redux';
import contentReducer from './content/contentReducer'
import thunk from 'redux-thunk';


const appReducer = combineReducers({
    contentReducer
});


export default createStore(appReducer, {}, applyMiddleware(thunk));
