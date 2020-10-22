import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {NetworkSpeed, State} from '../../utils/types';
import { selectURL, fetchUrlsStart, fetchAllResultsStart, fetchCookiesStart, fetchFilteredResultsStart } from '../../State/actions';
import { NOT_SELECTED_URL_VALUE } from '../../utils/constants';
import { ButtonPrimary } from '../Common/Button';

const Container = styled.div`
display: flex;
width: 100%;
`;

const Selector = styled.select`
    width: 30%;
    padding: 6px 12px;
    border-radius: 8px;
    border: none;
`;

const FilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 32px;
`;

const FilterDiv = styled.div`
    width: 30%
`;

const FilterSelector = styled.select`
    width: 100%;
    display: block;
    padding: 6px 12px;
    border-radius: 8px;
    border: none;
`;

const CategoryList = styled.ul`
    list-style: none;
    padding: 0;

    li {
        margin: 6px 0;
    }
`;

type Filters = {
    categories: {
        performance: boolean,
        accessibility: boolean,
        "best-practices": boolean,
        seo: boolean,
        pwa: boolean
    },
    mobile: boolean,
    networkSpeed: NetworkSpeed,
    cookie: {name: string, value: string}
}

const queryBuilder = (url: string, filters: Filters) => {
    const query = [`url=${url}`];
    const { categories } = filters;
    if (!(categories.performance && categories.accessibility && categories["best-practices"] && categories.pwa && categories.seo)) {
        let categoryQuery = []
        if (categories.performance) {
            categoryQuery.push('performance')
        }
        if (categories.accessibility) {
            categoryQuery.push('accessibility')
        }
        if (categories["best-practices"]) {
            categoryQuery.push('best-practices')
        }
        if (categories.pwa) {
            categoryQuery.push('pwa')
        }
        if (categories.seo) {
            categoryQuery.push('seo')
        }
        query.push(`categories=${categoryQuery.join(',')}`);
    }
    if (filters.mobile) {
        query.push('mobile=mobile')
    }
    if (filters.networkSpeed !== 'none') {
        query.push(`dataSpeed=${filters.networkSpeed}`)
    }
    if (filters.cookie.value !== 'none') {
        query.push(`cookies=${filters.cookie.name}=${filters.cookie.value}`)
    }
    return `?${query.join('&')}`
}

export default () => {
    const dispatch = useDispatch();
    const { selectedUrl, urls, isRunningTest, cookies } = useSelector((state: State) => state);
    const [filters, setFilters] = useState<Filters>({
        categories: {
            performance: true,
            accessibility: true,
            "best-practices": true,
            seo: true,
            pwa: true
        },
        mobile: false,
        networkSpeed: 'none',
        cookie: {name: 'none', value: 'none'}
    });

    useEffect(() => {
        dispatch(fetchUrlsStart());
    }, [dispatch]);

    useEffect(() => {
        if (selectedUrl !== NOT_SELECTED_URL_VALUE) {
            dispatch(fetchFilteredResultsStart(queryBuilder(selectedUrl, filters)));
            dispatch(fetchCookiesStart(selectedUrl));
        }
    }, [dispatch, selectedUrl]);

    useEffect(() => {
        if (selectedUrl !== NOT_SELECTED_URL_VALUE) {
            dispatch(fetchFilteredResultsStart(queryBuilder(selectedUrl, filters)));
        }
    }, [dispatch, filters]);

    useEffect(() => {
        if (selectedUrl !== NOT_SELECTED_URL_VALUE && isRunningTest === false) {
            dispatch(fetchAllResultsStart(selectedUrl));
        }
    // selecting new url shouldn't trigger this hook
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, isRunningTest]);

    const onCategoryChange = (categoryName: keyof Filters["categories"]) => {
        const newFilters = {...filters};
        newFilters.categories[categoryName] = !filters.categories[categoryName];
        setFilters(newFilters);
    }


    const ResultFilters = () => (
        <div>
            <h2> Filters </h2>
            <FilterContainer>
                <FilterDiv>
                    <h3>Categories</h3>
                    <CategoryList>
                        <li>
                            <input
                                    checked={filters.categories.performance}
                                    type="checkbox"
                                    name="performance"
                                    id="performance-filter-checkbox"
                                    onChange={() => onCategoryChange('performance')}
                            />
                            <label htmlFor="performance-filter-checkbox">Performance</label>
                        </li>
                        <li>
                            <input
                                checked={filters.categories.accessibility}
                                type="checkbox"
                                name="accessibility"
                                id="accessibility-filter-checkbox"
                                onChange={() => onCategoryChange('accessibility')}
                            />
                            <label htmlFor="accessibility-filter-checkbox">Accessibility</label>
                        </li>
                        <li>
                            <input
                                checked={filters.categories["best-practices"]}
                                type="checkbox"
                                name="best-practices"
                                id="best-practices-filter-checkbox"
                                onChange={() => onCategoryChange('best-practices')}
                            />
                            <label htmlFor="best-practices-filter-checkbox">Best Practices</label>
                        </li>
                        <li>
                            <input
                                checked={filters.categories.seo}
                                type="checkbox"
                                name="seo"
                                id="seo-filter-checkbox"
                                onChange={() => onCategoryChange('seo')}
                            />
                            <label htmlFor="seo-filter-checkbox">SEO</label>
                        </li>
                        <li>
                            <input
                                checked={filters.categories.pwa}
                                type="checkbox"
                                name="pwa"
                                id="pwa-filter-checkbox"
                                onChange={() => onCategoryChange('pwa')}
                            />
                            <label htmlFor="pwa-filter-checkbox">PWA</label>
                        </li>
                    </CategoryList>
                </FilterDiv>
                <FilterDiv>
                    <h3>Mobile</h3>
                    <div>
                        <input
                            checked={filters.mobile}
                            type="checkbox"
                            name="emulate-mobile"
                            id="emulate-mobile-filter-checkbox"
                            onChange={() => {
                                const newFilters = {...filters, mobile: !filters.mobile};
                                setFilters(newFilters);
                            }}
                        />
                        <label htmlFor="emulate-mobile-filter-checkbox">Emulate mobile</label>
                    </div>
                    <h4>Mobile Network Speed</h4>
                    <div>
                        <FilterSelector
                            value={filters.networkSpeed}
                            name="mobile-network-speed"
                            id="network-speed-filter-select"
                            onChange={(event) => {
                                const newFilters: Filters = {...filters, networkSpeed: event.target.value as NetworkSpeed};
                                setFilters(newFilters);
                            }}
                        >
                            <option value="none">Default</option>
                            <option value="2g">2G</option>
                            <option value="3g">3G</option>
                            <option value="4g">4G</option>
                        </FilterSelector>
                    </div>
                </FilterDiv>
                <FilterDiv>
                    <h3>Cookies</h3>
                    <div>
                        <h4>
                            <label htmlFor="cookie-name-filter-select">Name</label>
                        </h4>
                        <FilterSelector
                            value={filters.cookie.name}
                            name="cookie-name"
                            id="cookie-name-filter-select"
                            onChange={(event) => {
                                setFilters({...filters, cookie: {name: event.target.value, value: 'none'}})
                            }}
                        >
                            <option value='none'> None </option>
                            {cookies.map((cookie, idx) =>  <option key={idx} value={cookie.name} > {cookie.name} </option>)}
                        </FilterSelector>
                    </div>
                    <div>
                        <h4><label htmlFor="cookie-value-filter-select">Value</label></h4>
                        <FilterSelector
                            value={filters.cookie.value}
                            name="cookie-value"
                            id="cookie-value-filter-select"
                            onChange={(event) => {
                                setFilters({...filters, cookie: {...filters.cookie,  value: event.target.value}})
                            }}
                        >
                            <option value='none'> None </option>
                            {filters.cookie.name !== 'none' ?
                                cookies.find((cookie) => cookie.name === filters.cookie.name)!.values.map((value: string, idx: number) => {
                                    return <option key={idx} value={value} > {value} </option>
                                })
                            : null}
                        </FilterSelector>
                    </div>
                </FilterDiv>
            </FilterContainer>
        </div>
    )

    return (
        <div>
            <h1>
                Result Controlls
            </h1>
            <Container>
                <Selector value={selectedUrl || NOT_SELECTED_URL_VALUE} onChange={(event) => {
                    dispatch(selectURL(event.target.value));
                }}>
                    <option value={NOT_SELECTED_URL_VALUE} disabled>Please select...</option>
                    {urls.map((url) => (
                        <option key={url} value={url} >{url}</option>
                    ))}
                </Selector>

                <ButtonPrimary
                style={{
                    marginLeft: 'auto',
                    alignSelf: 'flex-end'
                }}
                onClick={() => {
                    dispatch(selectURL(NOT_SELECTED_URL_VALUE));
                    dispatch(fetchAllResultsStart(""))
                }}
                title='Fetch all results' />
            </Container>
                { selectedUrl !== NOT_SELECTED_URL_VALUE ? ResultFilters() : null }

        </div>
    )
}