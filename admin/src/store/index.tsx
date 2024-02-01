import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';



const persistConfig:any = {
    key: 'root',
    storage,
    whitelist: ''
  }

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
  })

export const persistor = persistStore(store)

// export default configureStore({
//     reducer: rootReducer,
// });

export type IRootState = ReturnType<typeof rootReducer>;
