import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
    margin: 16px auto;
`;

const UrlInput = styled.input`
    width: 100%;
    display: block;
    padding: 6px 8px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
`;

const Suggestion = styled.div`
    background-color: #fff;
    cursor: pointer;
    margin: 0;
    border: 1px solid #eee;
    padding: 6px 8px;
    border-radius: 5px;

    &:hover {
        background-color: #aaa;
    }
`;

type InputProps = {
    name?: string,
    id?: string,
    style?: React.CSSProperties,
    value: string,
    onChange: (event: string) => void,
    suggestions: string[],
    disabled: boolean
}

export default ({
    value,
    onChange,
    suggestions,
    style,
    name,
    id,
    disabled
}: InputProps) => {

    const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        setFilteredSuggestions(suggestions.filter(suggestion => suggestion.indexOf(value) !== -1));
    }, [value, suggestions]);

    useEffect(() => {
        if (value === '') {
            setShowSuggestions(false);
        } else {
            let isSuggestionSelected = false;
            filteredSuggestions.forEach(suggestion => {
                if (value === suggestion) {
                    isSuggestionSelected = true;
                }
            });
            setShowSuggestions(!isSuggestionSelected);
        }
    }, [value, filteredSuggestions]);

    return (
        <InputContainer style={style}>
            <UrlInput
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
                name={name}
                id={id}
                disabled={disabled}
                />
            <div>
                {showSuggestions ? filteredSuggestions.map(suggestion => (
                    <Suggestion
                        key={suggestion}
                        onClick={() => {onChange(suggestion)}}>
                    {suggestion}
                    </Suggestion>
                )) : null}
            </div>
        </InputContainer>
    )
}