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

export interface State {
    selectedUrl: string;
    isFetching: boolean;
    isRunningTest: boolean;
    urls: string[];
    results: Result[];
    errorMessage: any
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
    metrics: ResultMetrics,
    scores: ResultScores
};

export type MetricIdWithType = {
    id: string,
    metricType: keyof ResultMetrics
};

export type Cookie = {
    name: string,
    value: string
};

export type LighthouseConfig = {
    categories: string[],
    mobile: boolean,
    mobileDataSpeed?: '2g' | '3g' | '4g'
};

export interface TestRunnerRequestBody extends LighthouseConfig {
    url: string,
    cookies: Cookie[]
}
