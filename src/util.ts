export function getRandomArbitrary(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const randomEnumValue = (enumeration : any) => {
  const values = Object.keys(enumeration);
  const enumKey = values[Math.floor(Math.random() * values.length)];
  return enumeration[enumKey];
}