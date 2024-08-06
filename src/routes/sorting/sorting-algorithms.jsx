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
   elems.forEach(elem => elem && (elem.style.boxShadow = `0 0 1rem .5rem ${svar.colorPrimaryLighter}`));
   await delay(time);
   elems.forEach(elem => elem && (elem.style.boxShadow = 'none'));
}

function swapElems(elem1, elem2) {
   const height1 = elem1.offsetHeight;
   const height2 = elem2.offsetHeight;
   elem1.style.height = `${height2}px`;
   elem2.style.height = `${height1}px`;
}

async function heapSort(array, elems) {
   async function heapify(size, index) {
      let largest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      const leftElem = elems[left];
      const rightElem = elems[right];

      if (left < size) {
         const largestElem = elems[largest];
         await highlight(array.length, largestElem, leftElem);

         if (array[left] > array[largest]) {
            largest = left;
         }
      }

      if (right < size) {
         const largestElem = elems[largest];
         await highlight(array.length, largestElem, rightElem);

         if (array[right] > array[largest]) {
            largest = right;
         }
      } 

      if (largest !== index) {
         [array[index], array[largest]] = [array[largest], array[index]];

         const indexElem = elems[index];
         const largestElem = elems[largest];

         await highlight(array.length, indexElem, largestElem);

         swapElems(indexElem, largestElem);

         await heapify(size, largest);
      }
   }

   for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) await heapify(array.length, i);
   
   for (let i = array.length - 1; i > 0; i--) {
      [array[i], array[0]] = [array[0], array[i]];

      const iElem = elems[i];
      const zeroElem = elems[0];

      await highlight(array.length, iElem, zeroElem);
      swapElems(iElem, zeroElem);

      await heapify(i, 0);
   }

   return array;
}

function mergeSort(array, elems) {
   function mergeIdx(leftChunk, rightChunk) {
      const merged = [];
      let leftIdx = 0;
      let rightIdx = 0;

      while (leftIdx < leftChunk.length && rightIdx < rightChunk.length) {
         if (array[leftChunk[leftIdx]] < array[rightChunk[rightIdx]]) {
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

   function mergeSortIdx(idxArr) {
      if (idxArr.length <= 1) return idxArr;

      const middle = Math.floor(idxArr.length / 2);

      const leftChunk = idxArr.slice(0, middle);
      const rightChunk = idxArr.slice(middle);

      return mergeIdx(mergeSortIdx(leftChunk), mergeSortIdx(rightChunk));
   }

   const idxArr = array.map((_, idx) => idx);
   const sortedIdxArr = mergeSortIdx(idxArr);

   return sortedIdxArr.map(idx => array[idx]);
}

function quickSort(array, startIdx, endIdx) {

}

export const algorithms = {
   'heapsort': heapSort,
   'mergesort': mergeSort,
   'quicksort': quickSort,
}