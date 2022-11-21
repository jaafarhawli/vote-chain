import {configureStore, combineReducers} from '@reduxjs/toolkit';
import electionReducer from './election';
import {persistReducer, persistStore} from 'redux-persist';
import storage  from 'redux-persist/lib/storage';


const persistConfig =  {
    key: 'root',
    version: 1,
    storage
  }

const reducer = combineReducers({
  election: electionReducer,
})
  
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export const persistor = persistStore(store);