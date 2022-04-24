import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { 
    persistStore, 
    persistReducer, 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import todoReducer from './todoSlice';

const rootReducer = combineReducers({
    todos: todoReducer,
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;