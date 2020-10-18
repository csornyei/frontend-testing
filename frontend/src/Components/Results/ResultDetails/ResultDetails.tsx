import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MetricIdWithType, ResultMetrics } from '../../../utils/types';
import MetricSelector from './MetricSelector';
import HighlightElement from './HighlightElement';
import MetricsContainer from './MetricsContainer';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
`;

const HighlightContainer = styled(Container)`
    margin: 24px 0;
`;

const shouldShowMetric = (metrics: ResultMetrics, metricKey: keyof ResultMetrics) => metrics[metricKey].length > 0;

export default ({metrics}: {metrics: ResultMetrics}) => {

    const [selectedMetricKey, setSelectedMetricKey] = useState<keyof ResultMetrics | -1>(-1);
    const [selectedMetrics, setSelectedMetrics] = useState<MetricIdWithType[]>([]);
    const highlightMetrics: MetricIdWithType[] = [
        {id: 'first-contentful-paint', metricType: 'performance'},
        {id: 'first-meaningful-paint', metricType: 'performance'},
        {id: 'largest-contentful-paint', metricType: 'performance'},
        {id: 'speed-index', metricType: 'performance'},
        {id: 'first-cpu-idle', metricType: 'performance'},
        {id: 'interactive', metricType: 'performance'},
        {id: 'total-blocking-time', metricType: 'performance'},
    ];

    useEffect(() => {
        const selecteds = selectedMetrics.filter(metric => metric.metricType === selectedMetricKey);
        setSelectedMetrics(selecteds);
    }, [selectedMetricKey]);

    const isMetricSelected = (metric: string) => selectedMetrics.findIndex(selectedMetric => metric === selectedMetric.id) > -1;

    const addMetricToSelecteds = (metric: string, type: keyof ResultMetrics) => {
        if (!isMetricSelected(metric)) {
            const selecteds = [...selectedMetrics];
            selecteds.push({id: metric, metricType: type});
            setSelectedMetrics(selecteds);
            return true;
        }
        return false
    };

    const selectMetric = (metric: string, type: keyof ResultMetrics) => {
        if (!addMetricToSelecteds(metric, type)) {
            const selecteds = [...selectedMetrics];
            selecteds.splice(selecteds.findIndex(selectedMetric => metric === selectedMetric.id), 1);
            setSelectedMetrics(selecteds);
        }
    };

    const selectMetricKey = (name: keyof ResultMetrics) => {
        if (selectedMetricKey === name) {
            setSelectedMetricKey(-1)
        } else {
            setSelectedMetricKey(name);
        }
    };

    const highlights = highlightMetrics.map((value) => {
        const { id, metricType } = value;
        if (shouldShowMetric(metrics, metricType)) {
            const metricIndex = metrics[metricType].findIndex((metric) => metric.id === id);
            const metric = metrics[metricType][metricIndex]
            return <HighlightElement key={id} title={metric.title} score={metric.score} onClick={() => {
                setSelectedMetricKey(metricType);
                addMetricToSelecteds(id, metricType);
            }} />
        }
    });

    return (
        <div>
            <HighlightContainer>
                {highlights}
            </HighlightContainer>
            <Container>
                { shouldShowMetric(metrics, 'performance') ?
                    <MetricSelector title="Perfomance" onClick={() => selectMetricKey('performance')} /> :
                    null
                }
                { shouldShowMetric(metrics, 'accessibility') ?
                    <MetricSelector title="Accessibility" onClick={() => selectMetricKey('accessibility')} /> :
                    null
                }
                { shouldShowMetric(metrics, 'best-practices') ?
                    <MetricSelector title="Best Practices" onClick={() => selectMetricKey('best-practices')} /> :
                    null
                }
                { shouldShowMetric(metrics, 'seo') ?
                    <MetricSelector title="SEO" onClick={() => selectMetricKey('seo')} /> :
                    null
                }
                { shouldShowMetric(metrics, 'pwa') ?
                    <MetricSelector title="PWA" onClick={() => selectMetricKey('pwa')} /> :
                    null
                }
            </Container>
            { selectedMetricKey === -1 ?
                null :
                <MetricsContainer
                    metrics={metrics[selectedMetricKey]}
                    selectedMetrics={selectedMetrics}
                    onMetricClicked={(metric: string) => selectMetric(metric, selectedMetricKey)}
                />
            }
        </div>
    )
}