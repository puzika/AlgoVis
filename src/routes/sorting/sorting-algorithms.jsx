import * as svar from '../../variables.styles';

export const maxVal = 100;
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
   const height1 = elem1.style.height;
   const height2 = elem2.style.height;
   elem1.style.height = height2;
   elem2.style.height = height1;

   console.log(height1, height2);
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

async function mergeSort(array, elems) {
   async function mergeIdx(leftChunk, rightChunk) {
      const merged = [];
      let leftIdx = 0;
      let rightIdx = 0;
      let currentElemIdx = Math.min(...leftChunk);

      while (leftIdx < leftChunk.length && rightIdx < rightChunk.length) {
         const leftElem = elems[leftChunk[leftIdx]];
         const rightElem = elems[rightChunk[rightIdx]];
         const currentElem = elems[currentElemIdx];

         await highlight(array.length, leftElem, rightElem);

         if (array[leftChunk[leftIdx]] < array[rightChunk[rightIdx]]) {
            merged.push(leftChunk[leftIdx]);
            currentElem.style.height = `${array[leftChunk[leftIdx]]}%`;
            await highlight(array.length, currentElem);
            leftIdx++;
         } else {
            merged.push(rightChunk[rightIdx]);
            currentElem.style.height = `${array[rightChunk[rightIdx]]}%`;
            await highlight(array.length, currentElem);
            rightIdx++;
         }

         currentElemIdx++;
      }

      while (leftIdx < leftChunk.length) {
         merged.push(leftChunk[leftIdx]);

         const currentElem = elems[currentElemIdx];

         currentElem.style.height = `${array[leftChunk[leftIdx]]}%`;
         await highlight(array.length, currentElem);

         leftIdx++;
         currentElemIdx++;
      }

      while (rightIdx < rightChunk.length) {
         merged.push(rightChunk[rightIdx]);

         const currentElem = elems[currentElemIdx];

         currentElem.style.height = `${array[rightChunk[rightIdx]]}%`;
         await highlight(array.length, currentElem);

         rightIdx++;
         currentElemIdx++;
      }

      return merged;
   }

   async function mergeSortIdx(idxArr) {
      if (idxArr.length <= 1) return idxArr;

      const middle = Math.floor(idxArr.length / 2);

      const leftChunk = idxArr.slice(0, middle);
      const rightChunk = idxArr.slice(middle);

      return await mergeIdx(await mergeSortIdx(leftChunk), await mergeSortIdx(rightChunk));
   }

   const idxArr = array.map((_, idx) => idx);
   const sortedIdxArr = await mergeSortIdx(idxArr);

   return sortedIdxArr.map(idx => array[idx]);
}

async function quickSort(array, elems, startIdx = 0, endIdx = array.length - 1) {
   if (startIdx >= endIdx) return array;

   let i = startIdx - 1;

   for (let j = startIdx; j <= endIdx; j++) {
      const jElem = elems[j];
      const pivotElem = elems[endIdx];

      await highlight(array.length, jElem, pivotElem);

      if (array[j] < array[endIdx] || j === endIdx) {
         i++;

         const iElem = elems[i];

         await highlight(array.length, iElem, jElem);
         swapElems(iElem, jElem);

         [array[i], array[j]] = [array[j], array[i]];
      }
   }

   await quickSort(array, elems, startIdx, i - 1);
   await quickSort(array, elems, i + 1, endIdx);

   return array;
}

async function selectionSort(array, elems) {
   for (let i = 0; i < array.length - 1; i++) {
      let minIdx = i;

      for (let j = i + 1; j < array.length; j++) {
         const minElem = elems[minIdx];
         const jElem = elems[j];

         await highlight(array.length, minElem, jElem);

         if (array[j] < array[minIdx]) minIdx = j;
      }

      const iElem = elems[i];
      const minElem = elems[minIdx];

      await highlight(array.length, iElem, minElem);
      swapElems(minElem, iElem);

      [array[i], array[minIdx]] = [array[minIdx], array[i]];
   }

   return array;
}

async function bubbleSort(array, elems) {
   for (let i = 0; i < array.length - 1; i++) {
      let swapped = false;    //USED TO DETERMINE WHETHER OR NOT THE ARRAY IS SORTED (SORTED IF NO SWAPS OCCUR I.E. false)

      for (let j = 0; j < array.length - i - 1; j++) {
         const jElem = elems[j];
         const jNextElem = elems[j + 1];

         await highlight(array.length, jElem, jNextElem);

         if (array[j] > array[j + 1]) {
            swapElems(jElem, jNextElem);
            
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
            swapped = true;
         }
      }

      if (!swapped) break;    //ARRAY IS SORTED
   }

   return array;
}

export const sortAlgorithms = {
   'heapsort': heapSort,
   'mergesort': mergeSort,
   'quicksort': quickSort,
   'selectionsort': selectionSort,
   'bubblesort': bubbleSort,
}