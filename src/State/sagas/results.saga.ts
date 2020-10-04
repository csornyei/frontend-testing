import {
    Action,
    ActionType
} from '../../utils/types';
import {
    fetchUrlsStart,
    fetchResultsStart,
    fetchUrlsSuccess,
    fetchResultError,
    fetchResultsSuccess,
    runTestSuccess } from "../actions";
import { takeEvery, put } from "redux-saga/effects";
import axios from '../../utils/axios';

function* fetchUrls(action: Action) {
    try {
        const UrlsResponse = yield axios.get('/api/results/urls');
        const urls = yield UrlsResponse.data;
        yield put(fetchUrlsSuccess(urls));
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

function* runTest(action: Action) {
    const {payload} = action;
    try {
        const testResponse = yield axios.post('/api/results', {url: payload});
        const testData = yield testResponse.data;
        yield put(runTestSuccess(testData));
        yield put(fetchUrlsStart());
        yield put(fetchResultsStart(payload));
    } catch (error) {
        yield put(fetchResultError(error));
    }
}

export default function* watchFetchResultsSagas() {
    yield takeEvery(ActionType.fetchUrlsStart, fetchUrls);
    yield takeEvery(ActionType.fetchResultsStart, fetchResults);
    yield takeEvery(ActionType.runTestStart, runTest);
}