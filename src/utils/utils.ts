export const degreeToRad = (degree: number) => (Math.PI / 180) * degree;
export const normalizeRadius = (radius: number, width: number) => radius - 2 * width;