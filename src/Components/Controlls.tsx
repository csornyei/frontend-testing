import React, {useState} from 'react';
import styled from 'styled-components';
import axios from '../utils/axios';
import LoadingSpinner from './LoadingSpinner';
import Button from './Common/Button';

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
    const [testUrl, setTestUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const buttonPressed = async () => {
        setIsLoading(true)
        const resp = await axios.post('/api/results', {
            url: testUrl
        });
        setIsLoading(false);
        console.log(resp);
    }

    return (
        <ControllsContainer>
            <InputLabel>URL to test</InputLabel>
            <UrlInput type="text" id="url" name="url" value={testUrl} onChange={(event) => {setTestUrl(event.target.value)}} />
            <Button onClick={buttonPressed} title="Run test" style={{width: '10%', alignSelf: 'center', backgroundColor: '#81b214'}} />
            {isRunningTest ?
                <LoadingContainer>
                    <LoadingSpinner />
                </LoadingContainer>: ""}
        </ControllsContainer>
    )
}