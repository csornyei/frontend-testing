import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { format } from 'date-fns'
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { ResultScores, State } from '../../utils/types';

interface ChartData extends ResultScores {
    date: string,
}

const ChartContainer = styled.div`
    width: 600px;
    margin: 32px auto;
`;

export default () => {

    const { results } = useSelector((state: State) => state);
    const [chartData, setChartData] = useState<ChartData[]>([]);

    useEffect(() => {
        setChartData(results
            .map((result) => ({
                date: format(new Date(result.date), 'yyyy-MM-dd HH:mm'),
                ...result.scores
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
    }, [results]);


    return (
        <ChartContainer>
            <LineChart width={600} height={200} data={chartData}>
                <Line type="monotone" dataKey="Accessibility" stroke="#F5C12E" />
                <Line type="monotone" dataKey="Best Practices" stroke="#8884D8" />
                <Line type="monotone" dataKey="PWA" stroke="#004B95" />
                <Line type="monotone" dataKey="Performance" stroke="#6EC664" />
                <Line type="monotone" dataKey="SEO" stroke="#8F4700" />
                <XAxis dataKey='date' />
                <YAxis ticks={[0, 1]} />
                <Tooltip />
            </LineChart>
        </ChartContainer>
    )
}