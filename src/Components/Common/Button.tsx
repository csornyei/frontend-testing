import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
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

type ButtonProps = {
    title: string,
    onClick?: () => any
    style?: React.CSSProperties,
}

const Button = (
    {
        title,
        onClick,
        style,
    }: ButtonProps
    ) => {

    return (
        <StyledButton onClick={onClick} style={{...style}}> {title} </StyledButton>
    )
}

export const ButtonSuccess = (props: ButtonProps) => <Button {...props} style={{...props.style, backgroundColor: '#81b214'}} />
export const ButtonPrimary = (props: ButtonProps) => <Button {...props} style={{...props.style, backgroundColor: '#15bbed'}} />

export default Button;
