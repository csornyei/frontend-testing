import React from 'react';
import styled from 'styled-components';

const MetricRow = styled.div`
    width: 100%;
    background-color: #fff;
    border: 1px solid #111;
    border-collapse: collapse;
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
        background-color: #ddd;
    }
`;

export default ({metric, isSelected, onClick}: {metric: any, isSelected: boolean, onClick: () => void}) => {
    return (
        <MetricRow onClick={onClick} style={isSelected ? { 'backgroundColor': '#aaa' } : undefined} >
            <p> {metric.title} </p>
            {isSelected ? 'selected' : null}
        </MetricRow>
    )
}