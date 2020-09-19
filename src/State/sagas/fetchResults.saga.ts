import { Action, ActionType, fetchTypesSuccess, fetchResultError, fetchResultsSuccess } from "../actions";
import { takeEvery, put } from "redux-saga/effects";
import axios from '../../utils/axios';

function* fetchTypes(action: Action) {
    try {
        const typesResponse = yield axios.get('/api/results/types');
        const types = yield typesResponse.data;
        yield put(fetchTypesSuccess(types));
    } catch (error) {
        yield put(fetchResultError(error));
    }
}

function* fetchResults(action: Action) {
    const query = action.payload !== undefined ? `?url=${action.payload}` : ''
    try {
        const resultsResponse = yield axios.get(`/api/results${query}`);
        const results = yield resultsResponse.data;
        console.log(results);
        yield put(fetchResultsSuccess(results));
    } catch (error) {
        yield put(fetchResultError(error));
    }
}

export default function* watchFetchResultsSagas() {
    yield takeEvery(ActionType.fetchTypesStart, fetchTypes);
    yield takeEvery(ActionType.fetchResultsStart, fetchResults)
}