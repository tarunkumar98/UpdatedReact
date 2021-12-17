import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root.reducer';
import thunk from 'redux-thunk';
import rootSaga from './root-saga';


const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, sagaMiddleware,thunk];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

// export const persistor = persistStore(store);

export default store;