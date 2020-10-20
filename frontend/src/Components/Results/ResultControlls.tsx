import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {State} from '../../utils/types';
import { selectURL, fetchUrlsStart, fetchResultsStart } from '../../State/actions';
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

export default () => {
    const dispatch = useDispatch();
    const { selectedUrl, urls, isRunningTest } = useSelector((state: State) => state)

    // TODO - filter by config and cookies

    useEffect(() => {
        dispatch(fetchUrlsStart());
    }, [dispatch]);

    useEffect(() => {
        if (selectedUrl !== NOT_SELECTED_URL_VALUE) {
            dispatch(fetchResultsStart(selectedUrl));
        }
    }, [dispatch, selectedUrl]);

    useEffect(() => {
        if (selectedUrl !== NOT_SELECTED_URL_VALUE && isRunningTest === false) {
            dispatch(fetchResultsStart(selectedUrl));
        }
    // selecting new url shouldn't trigger this hook
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, isRunningTest]);

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
                    dispatch(fetchResultsStart(""))
                }}
                title='Fetch all results' />
            </Container>
        </div>
    )
}