import {combineReducers, configureStore} from '@reduxjs/toolkit';
import homeSlice from './reducers/homeReducer';
import dateSlice from './reducers/selectDate';
import requestSlice from './reducers/requestReducer';
import authSlice from './reducers/authReducer';
import chatSlice from './reducers/chatsReducer';
import timesSlice from './reducers/timesReducer';


const reducer = combineReducers({
  authSlice,
  dateSlice,
  homeSlice,
  requestSlice,
  chatSlice,
  timesSlice,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
