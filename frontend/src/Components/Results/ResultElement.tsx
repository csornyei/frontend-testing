import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { format } from 'date-fns';
import ResultProgress from './ResultProgress';
import { ButtonSuccess } from '../Common/Button';
import ResultDetails from './ResultDetails/ResultDetails';
import { State } from '../../utils/types';
import LoadingSpinner from '../LoadingSpinner';

const Container = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    background-color: #ccc;
    margin-bottom: 16px;
    margin-left: auto;
    margin-right: auto;
    padding: 16px 24px;
    border-radius: 6px;
`;

const ResultTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 16px;
`;

const ResultTitle = styled.h1`
    margin-top: 0;
    font-size: 18px;
    color: #222;
`;

const ScoreRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

const ScoreTitle = styled.h3`
    margin: 0;
    text-align: center
`;

const ScoreValue = styled.h4`
    margin: 0;
    text-align: center
`;

const MetricsContainer = ({metrics, isLoading}: {metrics: any, isLoading: boolean}) => {
        if (isLoading) {
            return <LoadingSpinner />
        } else {
            return <ResultDetails metrics={metrics} />
        }
}

export default ({
        result,
        onShowDetailsClicked,
        showDetails
    } : {
        result: any,
        onShowDetailsClicked: () => void,
        showDetails: boolean
    }) => {
    const { isFetchingOneResult, detailedResult } = useSelector((state: State) => state);
    const scores = Object.keys(result.scores).map((score) => {
        return (
            <div key={score}>
                <ResultProgress radius={60} progress={result.scores[score]} />
                <ScoreTitle> {score} </ScoreTitle>
                <ScoreValue> {result.scores[score]} </ScoreValue>
            </div>
        )
    });

    const convertThrottling = (settings: any) => {
        if (Object.keys(settings).indexOf("throttling") !== -1) {
            switch (settings.throttling.throughputKbps) {
                case 20480:
                    return '- 4G';
                default:
                    return '- not 4G';
            }
        }
        return ""
    }

    console.log(result.cookies);

    return (
        <Container>
            <ResultTitleContainer>
                <ResultTitle> {result.url} </ResultTitle>
                <ResultTitle> { result.config.settings.emulatedFormFactor } { convertThrottling(result.config.settings) } {result.cookies.length > 0 ? " - cookies set" : ""} </ResultTitle>
                <ResultTitle> {format(new Date(result.date), 'yyyy-MM-dd HH:mm')} </ResultTitle>
            </ResultTitleContainer>
            <ScoreRow>
                {scores}
            </ScoreRow>
            <ButtonSuccess title={'Show more'} style={{
                    width: '25%',
                    alignSelf: 'center',
                    marginTop: '16px'
                }}
                onClick={onShowDetailsClicked} />
            {showDetails ? <MetricsContainer isLoading={isFetchingOneResult} metrics={detailedResult?.metrics} /> : null}
        </Container>
    )
}