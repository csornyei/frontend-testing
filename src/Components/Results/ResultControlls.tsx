import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {State} from '../../State/reducer';
import { selectURL, fetchTypesStart, fetchResultsStart } from '../../State/actions';
import { NOT_SELECTED_URL_VALUE } from '../../utils/constants';

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

const Button = styled.button`
    width: 15%;
    align-self: flex-end;
    margin-left: auto;
    padding: 8px 6px;
    border: none;
    border-radius: 8px;
    background-color: #15bbed;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    outline: none;

    &:active {
        transform: translateY(5px);
    }
`;

export default () => {
    const dispatch = useDispatch();
    const { selectedUrl, types } = useSelector((state: State) => state)

    useEffect(() => {
        dispatch(fetchTypesStart());
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
                    {types.map((type) => (
                        <option key={type} value={type} >{type}</option>
                    ))}
                </Selector>

                <Button onClick={() => {
                    dispatch(selectURL(NOT_SELECTED_URL_VALUE));
                    dispatch(fetchResultsStart(""))
                }} > Fetch all results </Button>
            </Container>
        </div>
    )
}