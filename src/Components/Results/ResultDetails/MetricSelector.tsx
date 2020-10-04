import React from 'react';
import styled from 'styled-components';

const Selector = styled.button`
    cursor: pointer;
    padding: 12px 16px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #333;
    user-select: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    outline: none;

    &:hover {
        background-color: #ddd;
        border-color: #ccc;
    }

    &:active{
        background-color: #aaa;
        transform: translateY(5px);
    }
`;

export default ({title, onClick}: {title: string, onClick: () => void }) => {
    return (
        <Selector onClick={onClick} >
            {title}
        </Selector>
    )
}