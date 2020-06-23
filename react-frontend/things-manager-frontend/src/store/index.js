import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from '../reducers'
import storage from 'redux-persist/lib/storage';

const logger = createLogger();

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["userState"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    undefined,
    applyMiddleware(logger)
);

const persistor = persistStore(store);

export {
    store,
    persistor,
};
