import React, {useState} from 'react';
import styled from 'styled-components';
import axios from '../utils/axios';

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

const RunButton = styled.button`
    width: 10%;
    align-self: center;
    padding: 8px 6px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background-color: #81b214;
    font-size: 18px;
    font-weight: bold;
    outline: none;

    &:active {
        transform: translateY(5px);
    }
`;

export default () => {
    const [testUrl, setTestUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const buttonPressed = async () => {
        console.log('Button pressed');
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
            <RunButton onClick={buttonPressed} >Run test</RunButton>
            {isLoading ? "Loading..." : ""}
        </ControllsContainer>
    )
}