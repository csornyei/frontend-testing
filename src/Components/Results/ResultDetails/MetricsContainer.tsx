import React from 'react';
import styled from 'styled-components';
import { MetricIdWithType } from '../../../utils/types';
import MetricElement from './MetricElement'

const Container = styled.div`
    margin-top: 24px;
    display: flex;
    flex-direction: column
`;

export default ({metrics, selectedMetrics, onMetricClicked}: {metrics: any[], selectedMetrics: MetricIdWithType[], onMetricClicked: (metric: string) => void}) => {
    return (
        <Container>
            {metrics.map(metric => {
                const isSelected = selectedMetrics.findIndex(selected => selected.id === metric.id) > -1;
                return <MetricElement
                    key={metric.id}
                    metric={{...metric}}
                    isSelected={isSelected}
                    onClick={() => onMetricClicked(metric.id)}
                />
            })}
        </Container>
    )
}