import { fork } from 'redux-saga/effects';

import watchResultsSagas from './fetchResults.saga';

export default function* rootSaga() {
    yield fork(watchResultsSagas)
}