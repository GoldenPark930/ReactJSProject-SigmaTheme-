import immutableTransform from 'redux-persist-transform-immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import Immutable from 'immutable';
import storage from 'redux-persist/lib/storage';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import {
  persistStore,
  persistReducer,
} from 'redux-persist';

import reducers from './reducers';
import sagas from './sagas';

import ReduxService from '../utils/helpers/redux-service';

const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage,
  whitelist: ['groups'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
  stateTransformer: (state) => {
    const newState = {};

    for (const i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    }

    return newState;
  },
});

const allMiddlewares = [
  sagaMiddleware,
  // logger,
];

// Create Redux store with all middlewares
const store = createStore(
  persistedReducer,
  __DEV__ // eslint-disable-line no-undef
    ? composeWithDevTools(applyMiddleware(...allMiddlewares))
    : applyMiddleware(...allMiddlewares),
);

// Run all sagas with saga middleware
sagas.forEach(saga => sagaMiddleware.run(saga));

ReduxService.setDispatch(store.dispatch);

const persistor = persistStore(store);

export { store, persistor };
