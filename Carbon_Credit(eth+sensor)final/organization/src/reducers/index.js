import userReducer from "./user";
import authReducer from "./auth";
import blockReducer from "./blockchain";
import sensorReducer from './sensor';
import { combineReducers } from "redux";



const rootReducer = combineReducers({
    
    user: userReducer,
    auth: authReducer,
    blockchain: blockReducer,
    sensor: sensorReducer
    
});

export default rootReducer;