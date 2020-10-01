import { Action, ActionType } from './actions'
import { NOT_SELECTED_URL_VALUE } from '../utils/constants';

export interface State {
    selectedUrl: string;
    isFetching: boolean;
    isRunningTest: boolean;
    urls: string[];
    results: any[];
    errorMessage: any
};

const initialState: State = {
    selectedUrl: NOT_SELECTED_URL_VALUE,
    isFetching: false,
    isRunningTest: false,
    urls: [],
    results: [],
    errorMessage: null
}

export default (state = initialState, action: Action): State => {
    switch (action.type) {
        case ActionType.selectURL:
            return {...state, selectedUrl: action.payload};
        case ActionType.fetchUrlsStart:
        case ActionType.fetchResultsStart:
            return {...state, isFetching: true}
        case ActionType.fetchUrlsSuccess:
            return {...state, isFetching: false, urls: action.payload}
        case ActionType.fetchResultsSuccess:
            return {...state, isFetching: false, results: action.payload}
        case ActionType.resultsApiError:
            return {...state, isFetching: false, errorMessage: action.payload}
        case ActionType.runTestStart:
            return {...state, isRunningTest: true}
        case ActionType.runTestSuccess:
            return {...state, isRunningTest: false}
        default:
            return state;
    }
}