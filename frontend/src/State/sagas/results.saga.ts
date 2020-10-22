import {
    Action,
    ActionType
} from '../../utils/types';
import {
    fetchUrlsStart,
    fetchAllResultsStart,
    fetchUrlsSuccess,
    fetchResultError,
    fetchResultsSuccess,
    fetchOneResultSuccess,
    fetchCookiesSuccess,
    fetchFilteredResultsSuccess,
    runTestSuccess } from "../actions";
import { takeEvery, put, takeLatest } from "redux-saga/effects";
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

function* fetchCookies(action: Action) {
    try {
        const response = yield axios.get(`/api/results/cookies?url=${action.payload}`)
        const result = yield response.data;
        yield put(fetchCookiesSuccess(result))
    } catch (error) {
        yield put(fetchResultError(error));
    }
}

function* fetchResults(action: Action) {
    const query = action.payload !== undefined ? `?url=${action.payload}` : ''
    try {
        const resultsResponse = yield axios.get(`/api/results/full${query}`);
        const results = yield resultsResponse.data;
        yield put(fetchResultsSuccess(results));
    } catch (error) {
        yield put(fetchResultError(error));
    }
}

function* fetchFilteredResult(action: Action) {
    try {
        const response = yield axios.get(`/api/results${action.payload}`)
        const result = yield response.data;
        console.log(result);
        yield put(fetchFilteredResultsSuccess(result))
    } catch (error) {
        yield put(fetchResultError(error));
    }
}

function* fetchOneResult(action: Action) {
    try {
        const response = yield axios.get(`/api/results/${action.payload}`)
        const result = yield response.data;
        console.log(result)
        yield put(fetchOneResultSuccess(result))
    } catch (error) {
        yield put(fetchResultError(error));
    }
}

function* runTest(action: Action) {
    const {payload} = action;
    console.log(payload);
    try {
        const testResponse = yield axios.post('/api/results', {...payload});
        const testData = yield testResponse.data;
        yield put(runTestSuccess(testData));
        yield put(fetchUrlsStart());
        yield put(fetchAllResultsStart(payload));
    } catch (error) {
        yield put(fetchResultError(error));
    }
}

export default function* watchFetchResultsSagas() {
    yield takeEvery(ActionType.fetchUrlsStart, fetchUrls);
    yield takeLatest(ActionType.fetchCookiesStart, fetchCookies);
    yield takeEvery(ActionType.fetchAllResultsStart, fetchResults);
    yield takeEvery(ActionType.runTestStart, runTest);
    yield takeLatest(ActionType.fetchFilteredResultsStart, fetchFilteredResult);
    yield takeLatest(ActionType.fetchOneResultStart, fetchOneResult);
}