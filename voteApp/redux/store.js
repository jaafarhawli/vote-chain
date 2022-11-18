import {configureStore, combineReducers} from '@reduxjs/toolkit';
import electionReducer from './election';
  
const reducer = combineReducers({
  election: electionReducer,
})
  
export const store = configureStore({
  reducer: reducer,
});

export const persistor = persistStore(store);