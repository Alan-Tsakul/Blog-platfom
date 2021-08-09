import { combineReducers } from 'redux';
import  loadArticlesReducer   from './reducers/load-articles-reducer';
import userInfoReducer from './reducers/user-info-reducer';

const rootReducer = combineReducers({
  load: loadArticlesReducer,
  user: userInfoReducer,
});

export default rootReducer;