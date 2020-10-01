import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import LoadingSpinner from './LoadingSpinner';
import { ButtonSuccess } from './Common/Button';
import { State } from '../utils/types';
import { runTestStart } from '../State/actions';

const ControllsContainer = styled.div`
    margin-top: 24px;
    padding: 16px 8px;
    background-color: #d6e0f0;
    display: flex;
    flex-direction: column;
`;

const UrlInput = styled.input`
    width: 90%;
    display: block;
    margin: 16px auto;
    padding: 6px 8px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
`;

const InputLabel = styled.h2`
    align-self: center;
    text-align: center;
`;

const LoadingContainer = styled.div`
    align-self: center;
    margin-top: 24px;
`;

export default () => {
    const dispatch = useDispatch();
    const [testUrl, setTestUrl] = useState("");
    const {isRunningTest} = useSelector((state: State) => state);

    const buttonPressed = async () => {
        dispatch(runTestStart(testUrl));
    }

    return (
        <ControllsContainer>
            <InputLabel>URL to test</InputLabel>
            <UrlInput type="text" id="url" name="url" value={testUrl} onChange={(event) => {setTestUrl(event.target.value)}} />
            <ButtonSuccess onClick={buttonPressed} title="Run test" style={{width: '10%', alignSelf: 'center'}} />
            {isRunningTest ?
                <LoadingContainer>
                    <LoadingSpinner />
                </LoadingContainer>: ""}
        </ControllsContainer>
    )
}