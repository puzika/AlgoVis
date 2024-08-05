import { algNames } from "./sorting-algorithm-names";

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

function delay(time) {
   return new Promise(resolve => {
      setTimeout(resolve, 1000 * 1 / time);
   });
}

function heapify(array, size, index) {
   let largest = index;
   const left = 2 * index + 1;
   const right = 2 * index + 2;

   if (left < size && array[left] > array[largest]) largest = left;
   if (right < size && array[right] > array[largest]) largest = right;

   if (largest !== index) {
      [array[index], array[largest]] = [array[largest], array[index]];
      heapify(array, size, largest);
   }
}

function heapSort(array) {
   for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) heapify(array, array.length, i);
   
   for (let i = array.length - 1; i > 0; i--) {
      [array[i], array[0]] = [array[0], array[i]];
      heapify(array, i, 0);
   }

   return array;
}

function merge(leftChunk, rightChunk) {
   const merged = [];
   let leftIdx = 0;
   let rightIdx = 0;

   while (leftIdx < leftChunk.length && rightIdx < rightChunk.length) {
      if (leftChunk[leftIdx] < rightChunk[rightIdx]) {
         merged.push(leftChunk[leftIdx]);
         leftIdx++;
      } else {
         merged.push(rightChunk[rightIdx]);
         rightIdx++;
      }
   }

   return merged.
      concat(leftChunk.slice(leftIdx)).
      concat(rightChunk.slice(rightIdx));
}

function mergeSort(array) {
   if (array.length <= 1) return array;

   const leftChunk = array.slice(0, Math.floor(array.length / 2));
   const rightChunk = array.slice(Math.floor(array.length / 2));

   return merge(mergeSort(leftChunk), mergeSort(rightChunk));
}

function quickSort(array, startIdx, endIdx) {

}

export const algorithms = {
   'heapsort': heapSort,
   'mergesort': mergeSort,
   'quicksort': quickSort,
}