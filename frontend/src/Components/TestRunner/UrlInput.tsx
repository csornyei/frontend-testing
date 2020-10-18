import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { State } from '../../utils/types';
import  InputWithSuggestions from '../Common/InputWithSuggestions';

const InputLabel = styled.label`
    align-self: center;
    text-align: center;
    font-size: 26px;
    font-weight: bold;
`;

const LoadingContainer = styled.div`
    align-self: center;
    margin-top: 24px;
`;

export default ({urlValue, setUrl, disabled}: {urlValue: string, setUrl: (url: string) => void, disabled: boolean}) => {
    const {urls} = useSelector((state: State) => state);



    return (
        <>
            <InputLabel htmlFor="url">URL to test</InputLabel>
            <InputWithSuggestions
                style={{width: '90%'}}
                id="url" name="url"
                value={urlValue}
                onChange={setUrl}
                suggestions={urls}
                disabled={disabled}
            />
        </>
    )
}