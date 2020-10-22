import { Action, ActionType, State } from '../utils/types'
import { NOT_SELECTED_URL_VALUE } from '../utils/constants';

const initialState: State = {
    selectedUrl: NOT_SELECTED_URL_VALUE,
    isFetching: false,
    isFetchingOneResult: false,
    isRunningTest: false,
    urls: [],
    results: [],
    errorMessage: null,
    cookies: [],
    detailedResult: null
}

export default (state = initialState, action: Action): State => {
    switch (action.type) {
        case ActionType.selectURL:
            return {...state, selectedUrl: action.payload};
        case ActionType.fetchUrlsStart:
        case ActionType.fetchAllResultsStart:
        case ActionType.fetchCookiesStart:
        case ActionType.fetchFilteredResultsStart:
            return {...state, isFetching: true};
        case ActionType.fetchOneResultStart:
            return {...state, isFetchingOneResult: true};
        case ActionType.fetchUrlsSuccess:
            return {...state, isFetching: false, urls: action.payload}
        case ActionType.fetchCookiesSuccess:
            return {...state, isFetching: false, cookies: action.payload}
        case ActionType.fetchAllResultsSuccess:
        case ActionType.fetchFilteredResultsSuccess:
            return {...state, isFetching: false, results: action.payload}
        case ActionType.resultsApiError:
            return {...state, isFetching: false, isRunningTest: false, isFetchingOneResult: false, errorMessage: action.payload}
        case ActionType.runTestStart:
            return {...state, isRunningTest: true}
        case ActionType.runTestSuccess:
            return {...state, isRunningTest: false}
        case ActionType.fetchOneResultSuccess:
            return {...state, isFetchingOneResult: false, detailedResult: action.payload }
        default:
            return state;
    }
}