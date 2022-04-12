import { combineReducers } from 'redux';
import authReducer from"./authReducer"
import profileReducer from "./profileReducer"
import follow from './followReducer';
const reducer =combineReducers({
authReducer,
profileReducer,
follow,
})
export default reducer