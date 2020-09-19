import { Action, ActionType } from './actions'
import { NOT_SELECTED_URL_VALUE } from '../utils/constants';

export interface State {
    selectedUrl: string;
    isFetching: boolean;
    types: string[];
    results: any[];
    errorMessage: any
};

const initialState: State = {
    selectedUrl: NOT_SELECTED_URL_VALUE,
    isFetching: false,
    types: [],
    results: [],
    errorMessage: null
}

export default (state = initialState, action: Action): State => {
    switch (action.type) {
        case ActionType.selectURL:
            return {...state, selectedUrl: action.payload};
        case ActionType.fetchTypesStart:
        case ActionType.fetchResultsStart:
            return {...state, isFetching: true}
        case ActionType.fetchTypesSuccess:
            return {...state, isFetching: false, types: action.payload}
        case ActionType.fetchResultsSuccess:
            return {...state, isFetching: false, results: action.payload}
        case ActionType.resultsApiError:
            return {...state, isFetching: false, errorMessage: action.payload}
        default:
            return state;
    }
}