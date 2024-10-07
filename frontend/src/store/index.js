import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import userReducer from './slice/userSlice';
import eventosReducer from './slice/eventosSlice';
import egresadoReducer from './slice/egresadoSlice';
import mentorReducer from './slice/mentorSlice';
import teamReducer from './slice/teamSlice';
import adminReducer from "./slice/adminSlice";

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['users']
};


const rootReducer = combineReducers({
    user: userReducer,
    mentors: mentorReducer,
    egresado: egresadoReducer,
    team: teamReducer,
    admin: adminReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configurar el store con middleware para ignorar las acciones no serializables
const storeRedux = configureStore({
  reducer: {
    eventos: eventosReducer,
    persistedReducer,
},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorar estas acciones no serializables
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Crear el persistor
const persistor = persistStore(storeRedux);

export { storeRedux, persistor };

