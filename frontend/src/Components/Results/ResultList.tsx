import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ResultElement from './ResultElement';
import ResultControlls from './ResultControlls';
import ResultChart from './ResultChart';
import LoadingSpinner from '../LoadingSpinner';
import { useSelector } from 'react-redux';
import { State } from '../../utils/types';
import styled from 'styled-components';
import { NOT_SELECTED_URL_VALUE } from '../../utils/constants';
import { fetchOneResultStart } from '../../State/actions';

const ResultsContainer = styled.div`
    margin-top: 32px
`;

export default () => {
    const { results, isFetching, selectedUrl } = useSelector((state: State) => state);
    const [showingDetails, setShowingDetails] = useState(-1);
    const dispatch = useDispatch();

    const resultElements = () => {
        if (results.length > 0) {
            return results.map((result, idx) => <ResultElement
            key={result._id}
            result={result}
            onShowDetailsClicked={() => {
                if (idx === showingDetails) {
                    setShowingDetails(-1)
                } else {
                    dispatch(fetchOneResultStart(result._id))
                    setShowingDetails(idx)
                }
            }}
            showDetails={idx === showingDetails}
            />)
        }
        return null
    }

    return (
        <div>
            <ResultControlls />
            {selectedUrl !== NOT_SELECTED_URL_VALUE && !isFetching ?
                <ResultChart /> :
                null
            }
            <ResultsContainer>
                {isFetching ? <LoadingSpinner /> :  resultElements() }
            </ResultsContainer>
        </div>
    )
}