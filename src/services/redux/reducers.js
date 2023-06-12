import { combineReducers } from 'redux';
import cartReducer from './reducer/cartReducer';

const rootReducer = combineReducers({
  cartReducer,
});

export default rootReducer;
