import React from 'react';

export default ({result} : {result: any}) => {
    return (
        <li>
            <div>
                <h4> {result.url} </h4>
                <span> {result.date} </span>
            </div>
            <div>
                        Performance: <span> {result.scores.Performance} </span>
                        Accessibility: <span> {result.scores.Accessibility} </span>
                        Best Practices: <span> {result.scores["Best Practices"]} </span>
                        SEO: <span> {result.scores.SEO} </span>
                        PWA: <span> {result.scores.PWA} </span>
            </div>
        </li>
    )
}