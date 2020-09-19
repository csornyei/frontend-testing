import React, {useEffect, useState} from 'react';
import axios from '../../utils/axios';
import ResultElement from './ResultElement';
import ResultControlls from './ResultControlls';

export default () => {
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
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