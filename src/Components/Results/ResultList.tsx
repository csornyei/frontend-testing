import React from 'react';
import ResultElement from './ResultElement';
import ResultControlls from './ResultControlls';
import LoadingSpinner from '../LoadingSpinner';
import { useSelector } from 'react-redux';
import { State } from '../../State/reducer';
import styled from 'styled-components';

const ResultsContainer = styled.div`
    margin-top: 32px
`;

export default () => {
    const { results, isFetching } = useSelector((state: State) => state);

    const resultElements = () => {
        if (results.length > 0) {
            return results.map(result => {
                return (
                    <ResultElement key={result._id} result={result} />
                )
            })
        }
        return null
    }

    return (
        <div>
            <ResultControlls />
            <ResultsContainer>
                {isFetching ? <LoadingSpinner /> :  resultElements() }
            </ResultsContainer>
        </div>
    )
}