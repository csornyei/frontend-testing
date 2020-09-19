import React from 'react';
import ResultElement from './ResultElement';
import ResultControlls from './ResultControlls';
import { useSelector } from 'react-redux';
import { State } from '../../State/reducer';

export default () => {
    const { results, isFetching } = useSelector((state: State) => state);

        axios.get('/api/results').then(res => {
            setResults(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

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
            <ul>
                {resultElements()}
            </ul>
        </div>
    )
}