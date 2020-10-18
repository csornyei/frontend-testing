import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import UrlInput from './UrlInput';
import TestControlls from './TestControlls';
import { ButtonSuccess } from '../Common/Button';
import { runTestStart } from '../../State/actions';
import LoadingSpinner from '../LoadingSpinner';
import { State } from '../../utils/types';

const ControllsContainer = styled.div`
    margin-top: 24px;
    padding: 16px 8px;
    background-color: #d6e0f0;
    display: flex;
    flex-direction: column;
`;

export default () => {
    const dispatch = useDispatch();
    const [urlToTest, setUrlToTest] = useState('');
    const {isRunningTest} = useSelector((state: State) => state);

    const buttonPressed = async () => {
        dispatch(runTestStart(urlToTest));
    }

    return (
        <ControllsContainer>
            <UrlInput urlValue={urlToTest} setUrl={setUrlToTest} disabled={isRunningTest}  />
            <TestControlls disabled={isRunningTest} />
            {isRunningTest ?
            <LoadingSpinner /> :
            <ButtonSuccess onClick={buttonPressed} title="Run test" style={{width: '10%', alignSelf: 'center'}} />
        }
        </ControllsContainer>
    )
}