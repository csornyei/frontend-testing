import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import ResultProgress from './ResultProgress';
import { ButtonSuccess } from '../Common/Button';
import ResultDetails from './ResultDetails/ResultDetails';

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

export default ({
        result,
        onShowDetailsClicked,
        showDetails
    } : {
        result: any,
        onShowDetailsClicked: () => void,
        showDetails: boolean
    }) => {
    return (
        <Container>
            <ResultTitleContainer>
                <ResultTitle> {result.url} </ResultTitle>
                <ResultTitle> {format(new Date(result.date), 'yyyy-MM-ii HH:mm')} </ResultTitle>
            </ResultTitleContainer>
            <ScoreRow>
                <div>
                    <ResultProgress radius={60} progress={result.scores.Performance} />
                    <ScoreTitle> Performance </ScoreTitle>
                    <ScoreValue> {result.scores.Performance} </ScoreValue>
                </div>
                <div>
                    <ResultProgress radius={60} progress={result.scores.Accessibility} />
                    <ScoreTitle> Accessibility </ScoreTitle>
                    <ScoreValue> {result.scores.Accessibility} </ScoreValue>
                </div>
                <div>
                    <ResultProgress radius={60} progress={result.scores["Best Practices"]} />
                    <ScoreTitle> Best Practices </ScoreTitle>
                    <ScoreValue> {result.scores["Best Practices"]} </ScoreValue>
                </div>
                <div>
                    <ResultProgress radius={60} progress={result.scores.SEO} />
                    <ScoreTitle> SEO </ScoreTitle>
                    <ScoreValue> {result.scores.SEO} </ScoreValue>
                </div>
                <div>
                    <ResultProgress radius={60} progress={result.scores.PWA} />
                    <ScoreTitle> PWA </ScoreTitle>
                    <ScoreValue> {result.scores.PWA} </ScoreValue>
                </div>
            </ScoreRow>
            <ButtonSuccess title={'Show more'} style={{
                    width: '25%',
                    alignSelf: 'center',
                    marginTop: '16px'
                }}
                onClick={onShowDetailsClicked} />
            {showDetails ? <ResultDetails metrics={result.metrics} /> : null}
        </Container>
    )
}