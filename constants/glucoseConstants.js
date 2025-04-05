export const GLUCOSE_LOW_THRESHOLD = 70;       // Hipoglucemia
export const GLUCOSE_HIGH_THRESHOLD = 180;     // Hiperglucemia

export const GLUCOSE_MIN_VALID = 10;           // Límite inferior válido
export const GLUCOSE_MAX_VALID = 800;          // Límite superior válido

export const getGlucoseStatus = (value) => {
  if (value < GLUCOSE_LOW_THRESHOLD) return "Bajo";
  if (value > GLUCOSE_HIGH_THRESHOLD) return "Alto";
  return "Normal";
};
