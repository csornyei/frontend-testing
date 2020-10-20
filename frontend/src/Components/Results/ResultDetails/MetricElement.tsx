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

const getDescriptionWithLink = (description: string) => {
    const descriptionLinkStart = description.indexOf('[');
    const descLinkPart = description.substring(descriptionLinkStart);
    const descriptionLinkTextEnd = descLinkPart.indexOf(']');
    const descriptionLinkUrlStart = descLinkPart.indexOf('(');
    const descriptionLinkUrlEnd = descLinkPart.indexOf(')');
    if (descriptionLinkTextEnd < descriptionLinkUrlStart && descriptionLinkUrlStart < descriptionLinkUrlEnd) {
        const descriptionLinkText = descLinkPart.substring(1, descriptionLinkTextEnd);
        const descriptionLinkUrl = descLinkPart.substring(descriptionLinkUrlStart + 1, descriptionLinkUrlEnd);
        const descTextPart = description.substring(0, descriptionLinkStart - 1);
        return <p> {descTextPart} <a href={descriptionLinkUrl}>{descriptionLinkText}</a></p>
    }
    return <p> {description} </p>
}

const ExpandedMetricView = ({metric}: {metric: any}) => {
    return (
        <div>
            {getDescriptionWithLink(metric.description)}
            { !!metric.score ?
                <p> Score: {metric.score} </p> : null
            }
            {metric.scoreDisplayMode === 'numeric' ?
                <p> Value: {metric.displayValue} </p> :
                metric.scoreDisplayMode === 'binary' ?
                    <p> Value: {metric.displayValue === '0' ? 'true' : 'false'} </p> : null
            }
        </div>
    )
}

export default ({metric, isSelected, onClick}: {metric: any, isSelected: boolean, onClick: () => void}) => {
    return (
        <MetricRow onClick={onClick}  >
            <p style={isSelected ? { 'fontWeight': 'bold' } : undefined}> {metric.title} </p>
            {isSelected ? <ExpandedMetricView metric={metric} /> : null}
        </MetricRow>
    )
}