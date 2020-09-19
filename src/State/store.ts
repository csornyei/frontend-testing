import { createStore, applyMiddleware } from 'redux';
import createSageMiddleware from 'redux-saga';
import reducer from './reducer'
import RootSaga from './sagas/root.saga';

const sagaMiddleware = createSageMiddleware();
const middlewares = [sagaMiddleware];

const store = createStore(reducer, applyMiddleware(...middlewares));

sagaMiddleware.run(RootSaga);

export default store;
