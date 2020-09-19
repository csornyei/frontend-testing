export enum ActionType {
    selectURL = "SELECT_URL",
    fetchTypesStart = "FETCH_TYPES_START",
    fetchTypesSuccess = "FETCH_TYPES_SUCCESS",
    fetchResultsStart = "FETCH_RESULTS_START",
    fetchResultsSuccess = "FETCH_RESULTS_SUCCESS",
    resultsApiError = "RESULTS_API_ERROR",
}

export type Action = {
    type: ActionType,
    payload: any
}

export const fetchTypesStart = (): Action => ({
    type: ActionType.fetchTypesStart,
    payload: null
});

export const fetchTypesSuccess = (data: string[]): Action => ({
    type: ActionType.fetchTypesSuccess,
    payload: data
});

export const fetchResultsStart = (url?: string): Action => ({
    type: ActionType.fetchResultsStart,
    payload: url
});

export const fetchResultsSuccess = (data: any): Action => ({
    type: ActionType.fetchResultsSuccess,
    payload: data
});

export const fetchResultError = (errorMessage: any): Action => ({
    type: ActionType.resultsApiError,
    payload: errorMessage
});

export const selectURL = (url: string): Action => ({
    type: ActionType.selectURL,
    payload: url
});