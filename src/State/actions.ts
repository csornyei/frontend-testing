export enum ActionType {
    selectURL = "SELECT_URL",
    fetchUrlsStart = "FETCH_URLS_START",
    fetchUrlsSuccess = "FETCH_URLS_SUCCESS",
    fetchResultsStart = "FETCH_RESULTS_START",
    fetchResultsSuccess = "FETCH_RESULTS_SUCCESS",
    resultsApiError = "RESULTS_API_ERROR",
    runTestStart = 'RUN_TEST_START',
    runTestSuccess = 'RUN_TEST_SUCCESS',
}

export type Action = {
    type: ActionType,
    payload: any
}

export const fetchUrlsStart = (): Action => ({
    type: ActionType.fetchUrlsStart,
    payload: null
});

export const fetchUrlsSuccess = (data: string[]): Action => ({
    type: ActionType.fetchUrlsSuccess,
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

export const runTestStart = (url: string): Action => ({
    type: ActionType.runTestStart,
    payload: url
})

export const runTestSuccess = (data: any): Action => ({
    type: ActionType.runTestSuccess,
    payload: data
})