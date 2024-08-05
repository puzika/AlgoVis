import { algNames } from "./sorting-algorithm-names";
import * as svar from '../../variables.styles';

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

function delay(time) {                 //TIME  ---- ARRAY SIZE. I.E. ARRAY SIZE = 50 ===> setTimeout(resolve, 20)
   return new Promise(resolve => {
      setTimeout(resolve, 1000 / time);
   });
}

async function highlight(time, ...elems) {
   elems.forEach(elem => elem && (elem.style.boxShadow = `0 0 2rem ${svar.colorPrimary}`));
   await delay(time);
   elems.forEach(elem => elem && (elem.style.boxShadow = 'none'));
}

function swapElems(elem1, elem2) {
   const height1 = elem1.offsetHeight;
   const height2 = elem2.offsetHeight;
   elem1.style.height = `${height2}px`;
   elem2.style.height = `${height1}px`;
}

async function heapify(array, size, index, elems) {
   let largest = index;
   const left = 2 * index + 1;
   const right = 2 * index + 2;

   const indexElem = elems[index];
   const leftElem = elems[left];
   const rightElem = elems[right];

   await highlight(array.length, indexElem, leftElem, rightElem);

   if (left < size && array[left] > array[largest]) largest = left;
   if (right < size && array[right] > array[largest]) largest = right;

   if (largest !== index) {
      [array[index], array[largest]] = [array[largest], array[index]];

      const largestElem = elems[largest];
      await highlight(array.length, indexElem, largestElem);
      swapElems(indexElem, largestElem);

      await heapify(array, size, largest, elems);
   }
}

async function heapSort(array, elems) {
   for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) await heapify(array, array.length, i, elems);
   
   for (let i = array.length - 1; i > 0; i--) {
      [array[i], array[0]] = [array[0], array[i]];

      const iElem = elems[i];
      const zeroElem = elems[0];

      await highlight(array.length, iElem, zeroElem);
      swapElems(iElem, zeroElem);

      await heapify(array, i, 0, elems);
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