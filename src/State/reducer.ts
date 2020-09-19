import { Action, ActionType } from './actions'

export interface State {
    selectedUrl: string;
    isFetching: boolean;
    types: string[];
    errorMessage: any
};

const initialState: State = {
    selectedUrl: '',
    isFetching: false,
    types: [],
    errorMessage: null
}

export default (state = initialState, action: Action): State => {
    switch (action.type) {
        case ActionType.selectURL:
            return {...state, selectedUrl: action.payload};
        case ActionType.fetchTypesStart:
            return {...state, isFetching: true}
        case ActionType.fetchTypesSuccess:
            return {...state, isFetching: false, types: action.payload}
        case ActionType.fetchResultError:
            return {...state, isFetching: false, errorMessage: action.payload}
        default:
            return state;
    }
}