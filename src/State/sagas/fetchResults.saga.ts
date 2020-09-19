import { Action, ActionType, fetchTypesSuccess, fetchResultError } from "../actions";
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

export default function* watchFetchResultsSagas() {
    yield takeEvery(ActionType.fetchTypesStart, fetchTypes);
}