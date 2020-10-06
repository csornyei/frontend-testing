import React, {useRef, useEffect} from 'react';
import { normalizeRadius, degreeToRad } from '../../utils/utils';


export default ({radius, progress}: {radius: number, progress: number}) => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const MAIN_CIRCLE_WIDTH = 10;
    const PROGRESS_CIRCLE_WIDTH = 6;
    const progressCircleColor = (() => {
        if (progress <= 0.33) {
            return '#ff0000';
        }
        if (progress <= 0.75) {
            return '#ffff00';
        }
        return '#00ff00';
    })();

    useEffect(() => {
        if (canvasRef.current !== null) {
            const context = canvasRef.current.getContext('2d')!;
            context.beginPath();
            context.strokeStyle = 'rgb(0, 0, 0)';
            context.lineWidth = MAIN_CIRCLE_WIDTH;
            context.arc(radius, radius, normalizeRadius(radius, MAIN_CIRCLE_WIDTH), -degreeToRad(225), -degreeToRad(315));
            context.stroke();
            context.closePath();
            context.beginPath();
            context.strokeStyle = progressCircleColor;
            context.lineWidth = PROGRESS_CIRCLE_WIDTH;
            context.arc(radius, radius, normalizeRadius(radius, MAIN_CIRCLE_WIDTH), -degreeToRad(220), -degreeToRad(580 - 2.6 * progress * 100));
            context.stroke();
            context.closePath();
        }
    }, [canvasRef, progress, radius, progressCircleColor]);

    return <canvas width={radius * 2} ref={canvasRef} height={radius * 2}></canvas>
}