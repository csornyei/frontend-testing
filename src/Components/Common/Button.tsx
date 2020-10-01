import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    padding: 6px 8px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    outline: none;
    &:active {
        transform: translateY(5px);
    }
`;

export default (
    {title, style = {}, onClick = () => {}}:
    {title: string, style?: React.CSSProperties, onClick: () => any}
    ) => {

    return (
        <Button onClick={onClick} style={{...style}}> {title} </Button>
    )
}