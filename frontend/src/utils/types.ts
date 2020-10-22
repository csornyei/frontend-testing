export enum ActionType {
    selectURL = "SELECT_URL",
    fetchUrlsStart = "FETCH_URLS_START",
    fetchUrlsSuccess = "FETCH_URLS_SUCCESS",
    fetchCookiesStart = "FETCH_COOKIES_START",
    fetchCookiesSuccess = "FETCH_COOKIES_SUCCESS",
    fetchAllResultsStart = "FETCH_ALL_RESULTS_START",
    fetchAllResultsSuccess = "FETCH_ALL_RESULTS_SUCCESS",
    fetchFilteredResultsStart = "FETCH_FILTERED_RESULTS_START",
    fetchFilteredResultsSuccess = "FETCH_FILTERED_RESULTS_SUCCESS",
    fetchOneResultStart = "FETCH_ONE_RESULT_START",
    fetchOneResultSuccess = "FETCH_ONE_RESULT_SUCCESS",
    resultsApiError = "RESULTS_API_ERROR",
    runTestStart = 'RUN_TEST_START',
    runTestSuccess = 'RUN_TEST_SUCCESS',
}

export type Action = {
    type: ActionType,
    payload: any
}

export interface State {
    selectedUrl: string;
    isFetching: boolean;
    isFetchingOneResult: boolean;
    isRunningTest: boolean;
    urls: string[];
    results: Result[];
    errorMessage: any;
    cookies: {name: string, values: string[]}[];
    detailedResult: DetailedResult | null,
};

export type ResultScores = {
    Accessibility: number,
    'Best Practices': number,
    PWA: number,
    Performance: number,
    SEO: number
}

export type ResultMetrics = {
    accessibility: any[],
    'best-practices': any[],
    performance: any[],
    pwa: any[],
    seo: any[]
}

export type Result = {
    date: string,
    url: string,
    __v: number,
    _id: string,
    config: [],
    cookies: [],
    metrics: ResultMetrics,
    scores: ResultScores
};

export interface DetailedResult extends Result {
    metrics: ResultMetrics,
    scores: ResultScores
}

export type MetricIdWithType = {
    id: string,
    metricType: keyof ResultMetrics
};

export type Cookie = {
    name: string,
    value: string
};

export type NetworkSpeed = 'none' | '2g' | '3g' | '4g';

export type LighthouseConfig = {
    categories: string[],
    mobile: boolean,
    mobileDataSpeed?: '2g' | '3g' | '4g'
};

export interface TestRunnerRequestBody extends LighthouseConfig {
    url: string,
    cookies: Cookie[]
}
