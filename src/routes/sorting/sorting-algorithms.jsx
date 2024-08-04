export const maxVal = 50;
export const minVal = 5;

function generateRandomNumber() {
   return Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
}

export function generateRandomArray(size) {
   const array = [];

   for (let i = 0; i < size; i++) array.push(generateRandomNumber());

   return array;
}