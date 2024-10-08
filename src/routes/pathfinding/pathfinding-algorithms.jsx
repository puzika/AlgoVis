import { get } from 'lodash';
import * as svar from '../../variables.styles';

class PriorityQueue {
   constructor() {
      this.queue = [];
   }

   compare(idx1, idx2) {
      if (this.queue[idx1][1] !== this.queue[idx2][1]) return this.queue[idx1][1] - this.queue[idx2][1];
      
      return this.queue[idx1][2] - this.queue[idx2][2];
   }

   bubbleUp(idx) {
      while (idx > 0) {
         const parentIdx = Math.floor((idx - 1) / 2);

         if (this.compare(idx, parentIdx) >= 0) break;

         [this.queue[parentIdx], this.queue[idx]] = [this.queue[idx], this.queue[parentIdx]];

         idx = parentIdx;
      }
   }

   sinkDown(idx) {
      let smallest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;

      if (left < this.size && this.compare(smallest, left) > 0) smallest = left; 
      if (right < this.size && this.compare(smallest, right) > 0) smallest = right; 

      if (smallest !== idx) {
         [this.queue[idx], this.queue[smallest]] = [this.queue[smallest], this.queue[idx]];
         this.sinkDown(smallest);
      }
   }

   enqueue(val) {
      this.queue.push(val);
      this.bubbleUp(this.size - 1);
   }

   dequeue() {
      if (this.size === 0) return null;

      const min = this.queue[0];
      const last = this.queue.pop();

      if (this.size > 0) {
         this.queue[0] = last;
         this.sinkDown(0);
      }

      return min;
   }

   contains(val) {
      const [valY, valX] = val;

      for (const [currCell, currDist] of this.queue) {
         const [currY, currX] = currCell;

         if (valY === currY && valX === currX) return true;
      }

      return false;
   }

   get size() {
      return this.queue.length;
   }
}

export function generateEmptyGrid(rows, cols) {
   const grid = [];

   for (let i = 0; i < rows; i++) {
      const row = [];

      for (let j = 0; j < cols; j++) {
         row.push('');
      }

      grid.push(row);
   }

   return grid;
}

export function clearGrid(elems) {
   elems.forEach(elem => {
      elem.style.backgroundColor = 'transparent';
      removeWall(elem);
   });
}

export function addWall(elem) {
   elem.style.backgroundSize = '100% 100%';
}

export function removeWall(elem) {
   elem.style.backgroundSize = '0 0';
}

//IF SOURCE NODE OR TARGET NODE GETS COVERED WITH A WALL WHILE GENERATING MAZE REMOVE WALL
export function removeWallFromNodes(grid, sourceCoords, targetCoords, elems) { 
   const cols = grid[0].length;

   const [sourceY, sourceX] = sourceCoords;
   const [targetY, targetX] = targetCoords;

   grid[sourceY][sourceX] = '';
   grid[targetY][targetX] = '';

   const sourceIdx = getPosition(sourceY, sourceX, cols);
   const targetIdx = getPosition(targetY, targetX, cols);

   const sourceElem = elems[sourceIdx];
   const targetElem = elems[targetIdx];

   removeWall(sourceElem);
   removeWall(targetElem);
}

function delay() {
   return new Promise((resolve) => {
      setTimeout(resolve, 10);
   })
}

function getPosition(y, x, cols) {
   return x + y * cols;
}

function shuffle(arr) {
   for (let i = arr.length - 1; i > 0; i--) {
      const randIdx = Math.floor(Math.random() * (i + 1));
      [arr[randIdx], arr[i]] = [arr[i], arr[randIdx]];
   }
}

function fillWithWalls(grid, elems) {
   const [rows, cols] = [grid.length, grid[0].length];

   clearPath(grid, elems);
   elems.forEach(elem => addWall(elem));
   
   for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
         grid[i][j] = '#';
      }
   }
} 

function isValidCell(grid, nextY, nextX) {
   const [rows, cols] = [grid.length, grid[0].length];

   return (
      nextY >= 0 &&
      nextY < rows &&
      nextX >= 0 &&
      nextX < cols &&
      grid[nextY][nextX] !== ''
   );
}

async function backtracking(grid, startCoords, endCoords, elems) {
   const [rows, cols] = [grid.length, grid[0].length];

   fillWithWalls(grid, elems);
   const dirs = [[-2, 0], [0, 2], [2, 0], [0, -2]];
   
   let currCell = [1, 1];
   const stack = [currCell];
   
   let [currY, currX] = currCell;

   grid[currY][currX] = '';

   const firstPosition = getPosition(currY, currX, cols);
   const firstElem = elems[firstPosition];

   removeWall(firstElem);

   await delay();

   while (stack.length > 0) {
      if (currCell.length === 0) {
         const [lastY, lastX] = stack.pop();

         for (const dir of dirs) {
            const [dy, dx] = dir;
            const [nextY, nextX] = [lastY + dy, lastX + dx];
            
            if (isValidCell(grid, nextY, nextX)) currCell = [lastY, lastX];
         }
      } else {
         shuffle(dirs);

         let nextCell;
         [currY, currX] = currCell;

         for (const dir of dirs) {
            const [dy, dx] = dir;
            const [nextY, nextX] = [currY + dy, currX + dx];
            
            if (isValidCell(grid, nextY, nextX)) {
               const [midY, midX] = [currY + dy / 2, currX + dx / 2];
               const midPosition = getPosition(midY, midX, cols);
               const nextPosition = getPosition(nextY, nextX, cols);
               const midElem = elems[midPosition];
               const nextElem = elems[nextPosition];

               grid[midY][midX] = '';
               grid[nextY][nextX] = '';

               removeWall(midElem);

               await delay();

               removeWall(nextElem);

               await delay();

               nextCell = [nextY, nextX];

               stack.push(nextCell);

               break;
            }
         }

         if (!nextCell) {
            stack.pop();
            currCell = [];
         } else currCell = nextCell;
      }
   }

   removeWallFromNodes(grid, startCoords, endCoords, elems);

   return grid;
}

async function huntAndKill(grid, startCoords, endCoords, elems) {
   const [rows, cols] = [grid.length, grid[0].length];

   fillWithWalls(grid, elems);
   const dirs = [[-2, 0], [0, 2], [2, 0], [0, -2]];

   const hunt = () => {
      for (let i = 1; i < rows; i += 2) {
         for (let j = 1; j < cols; j += 2) {
            if (grid[i][j] === '') {
               for (const dir of dirs) {
                  const [dy, dx] = dir;
                  const [nextY, nextX] = [i + dy, j + dx];

                  if (isValidCell(grid, nextY, nextX)) return [i, j];
               }
            }
         }
      }

      return [];  //NO UNVISITED CELL FOUND
   }

   grid[1][1] = '';  //MARK FIRST CELL AS VISITED
   
   let currentCell = [1, 1];
   const firstElemPosition = getPosition(1, 1, cols);
   const firstElem = elems[firstElemPosition];

   removeWall(firstElem);

   await delay();

   while (currentCell.length > 0) {
      shuffle(dirs);

      const [currY, currX] = currentCell;
      let nextCell;

      for (const dir of dirs) {
         const [dy, dx] = dir;
         const [nextY, nextX] = [currY + dy, currX + dx];

         if (isValidCell(grid, nextY, nextX)) nextCell = [nextY, nextX];

         if (nextCell) {
            const [midY, midX] = [currY + dy / 2, currX + dx / 2];
            const midElemPosition = getPosition(midY, midX, cols);
            const nextElemPosition = getPosition(nextY, nextX, cols);
            const midElem = elems[midElemPosition];
            const nextElem = elems[nextElemPosition];

            grid[midY][midX] = '';
            grid[nextY][nextX] = '';

            removeWall(midElem);

            await delay();
            
            removeWall(nextElem);

            await delay();

            currentCell = nextCell;

            break;
         }
      }

      if (!nextCell) currentCell = hunt();
   }

   removeWallFromNodes(grid, startCoords, endCoords, elems);

   return grid;
}

async function basicRandom(grid, startCoords, endCoords, elems) {
   const [rows, cols] = [grid.length, grid[0].length];

   grid = generateEmptyGrid(rows, cols);
   clearGrid(elems);

   for (let i = 0; i < rows; i++) {
      for (let j = Math.floor(Math.random() * 10 + 1); j < cols; j += Math.floor(Math.random() * 10 + 1)) {
         grid[i][j] = '#';

         const currPosition = getPosition(i, j, cols);
         const currElem = elems[currPosition];

         addWall(currElem);

         await delay();
      }
   }

   removeWallFromNodes(grid, startCoords, endCoords, elems);

   return grid;
}

async function reconstructPath(path, cols, elems) {
   path.reverse();

   for (const cell of path) {
      const position = getPosition(...cell, cols);
      const cellElem = elems[position];

      await delay();

      cellElem.style.backgroundColor = 'yellow';
   }
}

function clearVisitedCells(visited, cols, elems) {
   for (const cell of visited) {
      const cellPosition = getPosition(...cell, cols);
      const cellElem = elems[cellPosition];

      cellElem.style.boxShadow = 'none';
   }
}

function clearPath(grid, elems) {
   const [rows, cols] = [grid.length, grid[0].length];

   for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
         if (grid[i][j] === '#') continue;

         const cellPosition = getPosition(i, j, cols);
         const cellElem = elems[cellPosition];

         cellElem.style.backgroundColor = 'transparent';
      }
   }
}

function visitCell(cell) {
   cell.style.boxShadow = 'inset 0 0 .5rem .5rem aliceblue';
}

async function breadthFirstSearch(grid, startCoords, endCoords, elems) {
   const [rows, cols] = [grid.length, grid[0].length];
   const visited = new Map();
   const prev = new Array(rows * cols).fill(null);
   const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
   const queue = [startCoords];
   let path = [endCoords];

   clearPath(grid, elems);    //CLEAR PREVIOUSLY ANIMATED PATH

   const startPosition = getPosition(...startCoords, cols);
   const endPosition = getPosition(...endCoords, cols);

   while (queue.length > 0) {
      const [currY, currX] = queue.shift();
      const currPosition = getPosition(currY, currX, cols);

      if (visited.has(currPosition)) continue;
      else visited.set(currPosition, [currY, currX]);

      const currElem = elems[currPosition];

      visitCell(currElem);

      await delay();

      if (currPosition === endPosition) break;

      for (const dir of dirs) {
         const [dy, dx] = dir;
         const [nextY, nextX] = [currY + dy, currX + dx];
         const nextPosition = getPosition(nextY, nextX, cols);

         if (
            nextY >= 0 &&
            nextY < rows &&
            nextX >= 0 &&
            nextX < cols &&
            !visited.has(nextPosition) &&
            grid[nextY][nextX] !== '#'
         ) {
            queue.push([nextY, nextX]);
            prev[nextPosition] = [currY, currX];
         }
      }
   }

   let currPosition = endPosition;
   let currCell = prev[currPosition];

   while (currPosition !== startPosition) {
      if (!currCell) {
         path = [];
         break;
      }

      path.push(currCell);
      currPosition = getPosition(...currCell, cols);
      currCell = prev[currPosition];
   }

   clearVisitedCells([...visited.values()], cols, elems);

   await reconstructPath(path, cols, elems);

   console.log(path);

   return grid;
}

async function dijkstrasAlgorithm(grid, startCoords, endCoords, elems) {
   const [rows, cols] = [grid.length, grid[0].length];
   const visited = new Map();
   const queue = new PriorityQueue();
   const dist = new Array(rows * cols).fill(Infinity);
   const prev = new Array(rows * cols).fill(null);
   const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
   let path = [endCoords];

   const startPosition = getPosition(...startCoords, cols);
   const endPosition = getPosition(...endCoords, cols);

   clearPath(grid, elems);    //CLEAR PREVIOUSLY ANIMATED PATH

   dist[startPosition] = 0;
   queue.enqueue([startCoords, 0]);

   while (queue.size > 0) {
      const [currCell, currDist] = queue.dequeue();
      const [currY, currX] = currCell;
      const currPosition = getPosition(currY, currX, cols);

      if (currPosition === endPosition) break;

      if (visited.has(currPosition) || currDist > dist[currPosition]) continue;

      visited.set(currPosition, currCell);
      
      const currElem = elems[currPosition];

      visitCell(currElem);

      await delay();

      for (const [dy, dx] of dirs) {
         const [nextY, nextX] = [currY + dy, currX + dx];
         const nextPosition = getPosition(nextY, nextX, cols);
         const newDist = currDist + 1;

         if (
            nextY >= 0 &&
            nextY < rows &&
            nextX >= 0 &&
            nextX < cols &&
            grid[nextY][nextX] !== '#' &&
            !visited.has(nextPosition) &&
            dist[nextPosition] > newDist
         ) {
            dist[nextPosition] = newDist;
            queue.enqueue([[nextY, nextX], newDist]);
            prev[nextPosition] = currCell;
         }
      }
   }

   let currPosition = endPosition;
   let currCell = prev[currPosition];

   while (currPosition !== startPosition) {
      if (!currCell) {
         path = [];
         break;
      }

      path.push(currCell);
      currPosition = getPosition(...currCell, cols);
      currCell = prev[currPosition];
   }

   clearVisitedCells([...visited.values()], cols, elems);

   await reconstructPath(path, cols, elems);

   console.log(path);

   return grid;
}

async function aStar(grid, startCoords, endCoords, elems) {
   const [rows, cols] = [grid.length, grid[0].length];
   const visited = new Map();
   const queue = new PriorityQueue();
   const prev = new Array(rows * cols).fill(null);
   const gScore = new Array(rows * cols).fill(Infinity);
   const fScore = new Array(rows * cols).fill(Infinity);
   const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
   let path = [endCoords];

   const h = (y, x) => Math.abs(endCoords[0] - y) + Math.abs(endCoords[1] - x);
   
   const startPosition = getPosition(...startCoords, cols);
   const endPosition = getPosition(...endCoords, cols);
   
   clearPath(grid, elems);

   gScore[startPosition] = 0;
   fScore[startPosition] = h(...startCoords);
   queue.enqueue([startCoords, fScore[startPosition], fScore[startPosition]]);

   while (queue.size > 0) {
      const [currCell, currDist] = queue.dequeue();
      const [currY, currX] = currCell;
      const currPosition = getPosition(currY, currX, cols);

      if (currPosition === endPosition) break;

      visited.set(currPosition, currCell);

      const currElem = elems[currPosition];
      
      visitCell(currElem);

      await delay();

      for (const [dy, dx] of dirs) {
         const [nextY, nextX] = [currY + dy, currX + dx];
         const nextPosition = getPosition(nextY, nextX, cols);
         const tentativeGScore = gScore[currPosition] + 1;

         if (
            nextY >= 0 &&
            nextY < rows &&
            nextX >= 0 &&
            nextX < cols &&
            grid[nextY][nextX] !== '#' &&
            !visited.has(nextPosition) &&
            tentativeGScore < gScore[nextPosition]
         ) {
            const estimate = h(nextY, nextX);
            gScore[nextPosition] = tentativeGScore;
            fScore[nextPosition] = tentativeGScore + estimate;
            prev[nextPosition] = currCell;
            queue.enqueue([[nextY, nextX], fScore[nextPosition], estimate]);
         }
      }
   }

   let currPosition = endPosition;
   let currCell = prev[currPosition];

   while (currPosition !== startPosition) {
      if (!currCell) {
         path = [];
         break;
      }

      path.push(currCell);
      currPosition = getPosition(...currCell, cols);
      currCell = prev[currPosition];
   }

   clearVisitedCells([...visited.values()], cols, elems);

   await reconstructPath(path, cols, elems);

   console.log(path);

   return grid;
}

export const mazeAlgorithms = {
   'backtracking': backtracking,
   'huntandkill': huntAndKill,
   'basicrandom': basicRandom,
};

export const pathfindingAlgorithms = {
   'breadthfirstsearch': breadthFirstSearch,
   'dijkstrasalgorithm': dijkstrasAlgorithm,
   'astar': aStar,
};