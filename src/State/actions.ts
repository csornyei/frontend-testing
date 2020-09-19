export enum ActionType {
    selectURL = "SELECT_URL",
    fetchTypesStart = "FETCH_TYPES_START",
    fetchTypesSuccess = "FETCH_TYPES_SUCCESS",
    fetchResultError = "FETCH_RESULTS_ERROR"
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

export const fetchResultError = (errorMessage: any): Action => ({
    type: ActionType.fetchResultError,
    payload: errorMessage
});

export const selectURL = (url: string): Action => ({
    type: ActionType.selectURL,
    payload: url
});