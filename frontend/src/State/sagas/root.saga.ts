import { fork } from 'redux-saga/effects';

import watchResultsSagas from './results.saga';

export default function* rootSaga() {
    yield fork(watchResultsSagas)
}