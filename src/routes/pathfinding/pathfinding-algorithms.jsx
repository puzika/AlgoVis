import { get } from 'lodash';
import * as svar from '../../variables.styles';

//BOTH GRIDWIDTH AND GRIDHEIGHT MUST BE ODD

export const gridWidth = 65;
export const gridHeight = 25;

export function generateEmptyGrid() {
   const grid = [];

   for (let i = 0; i < gridHeight; i++) {
      const row = [];

      for (let j = 0; j < gridWidth; j++) {
         row.push('');
      }

      grid.push(row);
   }

   return grid;
}

export function clearGrid(elems) {
   elems.forEach(elem => elem.style.backgroundColor = 'transparent');
}

function delay() {
   return new Promise((resolve) => {
      setTimeout(resolve, 10);
   })
}

function getPosition(y, x) {
   return x + y * gridWidth;
}

function addWall(elem) {
   elem.style.backgroundColor = `${svar.colorPrimary}`;
}

function removeWall(elem) {
   elem.style.backgroundColor = 'transparent';
}

function shuffle(arr) {
   for (let i = arr.length - 1; i > 0; i--) {
      const randIdx = Math.floor(Math.random() * (i + 1));
      [arr[randIdx], arr[i]] = [arr[i], arr[randIdx]];
   }
}

function fillWithWalls(grid, elems) {
   elems.forEach(elem => addWall(elem));
   
   for (let i = 0; i < gridHeight; i++) {
      for (let j = 0; j < gridWidth; j++) {
         grid[i][j] = '#';
      }
   }
} 

function isValidCell(grid, nextY, nextX) {
   return (
      nextY >= 0 &&
      nextY < gridHeight &&
      nextX >= 0 &&
      nextX < gridWidth &&
      grid[nextY][nextX] !== ''
   );
}

async function backtracking(grid, elems) {
   fillWithWalls(grid, elems);
   const dirs = [[-2, 0], [0, 2], [2, 0], [0, -2]];
   
   let currCell = [1, 1];
   const stack = [currCell];
   
   let [currY, currX] = currCell;

   grid[currY][currX] = '';

   const firstPosition = getPosition(currY, currX);
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
               const midPosition = getPosition(midY, midX);
               const nextPosition = getPosition(nextY, nextX);
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
   
   console.log('done');

   return grid;
}

async function huntAndKill(grid, elems) {
   fillWithWalls(grid, elems);
   const dirs = [[-2, 0], [0, 2], [2, 0], [0, -2]];

   const hunt = () => {
      for (let i = 1; i < gridHeight; i += 2) {
         for (let j = 1; j < gridWidth; j += 2) {
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
   const firstElemPosition = getPosition(1, 1);
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
            const midElemPosition = getPosition(midY, midX);
            const nextElemPosition = getPosition(nextY, nextX);
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

   console.log('done');

   return grid;
}

async function reconstructPath(path, elems) {
   for (const cell of path) {
      const position = getPosition(...cell);
      const cellElem = elems[position];

      await delay();

      cellElem.style.backgroundColor = 'yellow';
   }
}

function clearVisitedCells(visited, elems) {
   for (const cell of visited) {
      const cellPosition = getPosition(...cell);
      const cellElem = elems[cellPosition];

      cellElem.style.boxShadow = 'none';
   }
}

function clearPath(grid, elems) {
   const [rows, cols] = [grid.length, grid[0].length];

   for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
         if (grid[i][j] === '#') continue;

         const cellPosition = getPosition(i, j);
         const cellElem = elems[cellPosition];

         cellElem.style.backgroundColor = 'transparent';
      }
   }
}

async function breadthFirstSearch(grid, startCoords, endCoords, elems) {
   const [rows, cols] = [grid.length, grid[0].length];
   const visited = new Map();
   const prev = new Array(rows * cols).fill(null);
   const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
   const queue = [startCoords];
   const path = [];

   clearPath(grid, elems);    //CLEAR PREVIOUSLY ANIMATED PATH

   const startPosition = getPosition(...startCoords);
   const endPosition = getPosition(...endCoords);

   while (queue.length > 0) {
      const [currY, currX] = queue.shift();
      const currPosition = getPosition(currY, currX);

      if (visited.has(currPosition)) continue;
      else visited.set(currPosition, [currY, currX]);

      const currElem = elems[currPosition];

      currElem.style.boxShadow = `inset 0 0 .5rem .5rem aliceblue`;

      await delay();

      if (currPosition === endPosition) break;

      for (const dir of dirs) {
         const [dy, dx] = dir;
         const [nextY, nextX] = [currY + dy, currX + dx];
         const nextPosition = getPosition(nextY, nextX);

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

   while (currCell && currPosition !== startPosition) {
      path.push(currCell);
      currPosition = getPosition(...currCell);
      currCell = prev[currPosition];
   }

   path.unshift(endCoords);

   clearVisitedCells([...visited.values()], elems);

   reconstructPath(path, elems);

   return grid;
}

function dijkstrasAlgorithm(grid, startCoords, endCoords, elems) {
   console.log('Dijkstra', elems);

   return grid;
}

export const mazeAlgorithms = {
   'backtracking': backtracking,
   'huntandkill': huntAndKill,
};

export const pathfindingAlgorithms = {
   'breadthfirstsearch': breadthFirstSearch,
   'dijsktrasalgorithm': dijkstrasAlgorithm,
};