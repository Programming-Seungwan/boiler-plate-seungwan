// redux-toolkit에서는 createSlice 를 통해 리듀서를 여러개 만들고 configureStore에 리듀서들을 여러개 등록해주었다.
// 그런데 그냥 순정 방식의 redux에서는 combineReducer를 통해서 함
import { combineReducers } from 'redux';
import user from './user_reducer';
import comment from './comment_reducer';

const rootReducer = combineReducers({
  user,
  comment,
});

export default rootReducer;
