import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {State} from '../../State/reducer';
import { selectURL, fetchUrlsStart, fetchResultsStart } from '../../State/actions';
import { NOT_SELECTED_URL_VALUE } from '../../utils/constants';
import Button from '../Common/Button';

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
    const { selectedUrl, urls } = useSelector((state: State) => state)

    useEffect(() => {
        dispatch(fetchUrlsStart());
    }, [dispatch]);

    useEffect(() => {
        if (selectedUrl !== NOT_SELECTED_URL_VALUE) {
            dispatch(fetchResultsStart(selectedUrl));
        }
    }, [dispatch, selectedUrl]);

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

                <Button
                style={{
                    backgroundColor: '#15bbed',
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