import { combineReducers } from 'redux';
import  loadArticlesReducer   from './load-articles-reducer';
import userInfoReducer from './user-info-reducer';

const rootReducer = combineReducers({
  load: loadArticlesReducer,
  user: userInfoReducer,
});

export default rootReducer;