import { Action, ActionType, TestRunnerRequestBody } from "../utils/types";


export const fetchUrlsStart = (): Action => ({
    type: ActionType.fetchUrlsStart,
    payload: null
});

export const fetchUrlsSuccess = (data: string[]): Action => ({
    type: ActionType.fetchUrlsSuccess,
    payload: data
});

export const fetchCookiesStart = (): Action => ({
    type: ActionType.fetchCookiesStart,
    payload: null
});

export const fetchCookiesSuccess = (data: any[]): Action => ({
    type: ActionType.fetchCookiesSuccess,
    payload: data
});

export const fetchResultsStart = (url?: string): Action => ({
    type: ActionType.fetchAllResultsStart,
    payload: url
});

export const fetchResultsSuccess = (data: any): Action => ({
    type: ActionType.fetchAllResultsSuccess,
    payload: data
});

export const fetchFilteredResultsStart = (filters: any[]): Action => ({
    type: ActionType.fetchFilteredResultsStart,
    payload: filters
});

export const fetchFilteredResultsSuccess = (data: any): Action => ({
    type: ActionType.fetchFilteredResultsSuccess,
    payload: data
});

export const fetchOneResultStart = (id: string): Action => ({
    type: ActionType.fetchOneResultStart,
    payload: id
});

export const fetchOneResultSuccess = (data: any): Action => ({
    type: ActionType.fetchOneResultSuccess,
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

export const runTestStart = (body: TestRunnerRequestBody): Action => ({
    type: ActionType.runTestStart,
    payload: body
})

export const runTestSuccess = (data: any): Action => ({
    type: ActionType.runTestSuccess,
    payload: data
})