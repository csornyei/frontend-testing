import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {State} from '../../State/reducer';
import { selectURL, fetchTypesStart } from '../../State/actions';

const Selector = styled.select`
    width: 30%;
    padding: 6px 12px;
    border-radius: 8px;
    border: none;
`;


export default () => {
    const dispatch = useDispatch();
    const { selectedUrl, types } = useSelector((state: State) => state)

    useEffect(() => {
        dispatch(fetchTypesStart());
    }, []);

    return (
        <div>
            <h1>
                Result Controlls
            </h1>
            <Selector defaultValue={selectedUrl} onChange={(event) => {
                dispatch(selectURL(event.target.value));
            }}>
                <option value="" disabled>Please select...</option>
                {types.map((type) => (
                    <option key={type} value={type} >{type}</option>
                ))}
            </Selector>
        </div>
    )
}