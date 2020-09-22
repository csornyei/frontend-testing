export function formatDateTime(date: string): string {
    const d = new Date(date);
    return `${d.getFullYear()}. ${formatNumber(d.getMonth() + 1)}. ${formatNumber(d.getDate())}. ${formatNumber(d.getHours())}:${formatNumber(d.getMinutes())}:${formatNumber(d.getSeconds())}`;
}

export const degreeToRad = (degree: number) => (Math.PI / 180) * degree;
export const normalizeRadius = (radius: number, width: number) => radius - 2 * width;

function formatNumber(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
}