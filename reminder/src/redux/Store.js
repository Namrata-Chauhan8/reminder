import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/Reducers'; 
import reminderReducer from './reducers/ReminderReducer';

const rootReducer = combineReducers({
  loginSignup: loginReducer,
  reminder: reminderReducer,

});

const store = configureStore({
  reducer: rootReducer,
});

export default store;