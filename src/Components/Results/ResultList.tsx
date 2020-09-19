import React from 'react';
import ResultElement from './ResultElement';
import ResultControlls from './ResultControlls';
import LoadingSpinner from '../LoadingSpinner';
import { useSelector } from 'react-redux';
import { State } from '../../State/reducer';

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
            {isFetching ?
            <LoadingSpinner /> :
                <ul>
                    {resultElements()}
                </ul>
            }
        </div>
    )
}