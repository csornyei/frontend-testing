import React from 'react';
import styled from 'styled-components';

const HighlightElement = styled.div`
    padding: 6px 8px;
    background-color: #444;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-weight: bold;
    margin: 6px;
    cursor: pointer;

    &:hover {
        background-color: #999;
    }
`;

const HighlightTitle = styled.h1`
    color: #fff;
    font-size: 14px;
    margin: 0
`;

const HighlightScore = styled.h2`
    font-size: 24px;
    margin: 0;
`;

export default ({title, score, onClick}: {title: string, score: number, onClick: () => void}) => {

    const scoreColor = score > 0.75 ? '#00ff00' : score > 0.33 ? '#ffff00' : '#ff0000';

    return (
        <HighlightElement onClick={onClick}>
            <HighlightTitle> {title} </HighlightTitle>
            <HighlightScore style={{color: scoreColor}} > {score} </HighlightScore>
        </HighlightElement>
    )
}