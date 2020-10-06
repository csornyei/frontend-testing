import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import LoadingSpinner from './LoadingSpinner';
import { ButtonSuccess } from './Common/Button';
import  InputWithSuggestions from './Common/InputWithSuggestions';
import { State } from '../utils/types';
import { runTestStart } from '../State/actions';

const ControllsContainer = styled.div`
    margin-top: 24px;
    padding: 16px 8px;
    background-color: #d6e0f0;
    display: flex;
    flex-direction: column;
`;

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

export default () => {
    const dispatch = useDispatch();
    const [testUrl, setTestUrl] = useState("");
    const {isRunningTest, urls} = useSelector((state: State) => state);

    const buttonPressed = async () => {
        dispatch(runTestStart(testUrl));
    }

    return (
        <ControllsContainer>
            <InputLabel htmlFor="url">URL to test</InputLabel>
            <InputWithSuggestions
                style={{width: '90%'}}
                id="url" name="url"
                value={testUrl}
                onChange={(url) => {setTestUrl(url)}}
                suggestions={urls}
            />
            <ButtonSuccess onClick={buttonPressed} title="Run test" style={{width: '10%', alignSelf: 'center'}} />
            {isRunningTest ?
                <LoadingContainer>
                    <LoadingSpinner />
                </LoadingContainer>: ""}
        </ControllsContainer>
    )
}