import React, {useEffect, useState} from 'react';
import axios from '../../utils/axios';
import styled from 'styled-components';

const Selector = styled.select`
    width: 30%;
    padding: 6px 12px;
    border-radius: 8px;
    border: none;
`;


export default () => {

    const [types, setTypes] = useState<string[]>([]);
    const [selectedUrl, setSelectedUrl] = useState("");

    useEffect(() => {
        axios.get('/api/results/types')
        .then(res => {
            setTypes(res.data)
        })
        .catch(err => {
            console.log(err)
        });
    }, []);

    return (
        <div>
            <h1>
                Result Controlls
            </h1>
            <Selector defaultValue={selectedUrl} onChange={(event) => {
                setSelectedUrl(event.target.value)
            }}>
                <option value="" disabled>Please select...</option>
                {types.map((type) => (
                    <option key={type} value={type} >{type}</option>
                ))}
            </Selector>
        </div>
    )
}