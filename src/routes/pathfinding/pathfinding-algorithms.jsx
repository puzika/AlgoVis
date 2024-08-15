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
      setTimeout(resolve, 20);
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

async function backtracking(grid, elems) {
   fillWithWalls(grid, elems);
   const dirs = [[-2, 0], [0, 2], [2, 0], [0, -2]];
   
   async function backtrack(currY = 1, currX = 1) {
      grid[currY][currX] = '';

      const currPosition = getPosition(currY, currX);
      const currCell = elems[currPosition];

      removeWall(currCell);

      await delay();

      shuffle(dirs);

      for (const dir of dirs) {
         const [dy, dx] = dir;
         const [nextY, nextX] = [currY + dy, currX + dx];

         if (
            nextX >= 0 &&
            nextX < gridWidth &&
            nextY >= 0 &&
            nextY < gridHeight &&
            grid[nextY][nextX] !== ''
         ) {
            const [midY, midX] = [currY + dy / 2, currX + dx / 2];
            const midPosition = getPosition(midY, midX);
            const midCell = elems[midPosition];

            grid[midY][midX] = '';
            removeWall(midCell);

            await delay();

            await backtrack(nextY, nextX);
         }
      }
   }

   await backtrack();

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

                  if (
                     nextX >= 0 &&
                     nextX < gridWidth &&
                     nextY >= 0 &&
                     nextY < gridHeight &&
                     grid[nextY][nextX] !== ''
                  ) return [i, j];
               }
            }
         }
      }

      return [];  //ALL CELLS HAVE BEEN VISITED
   }

   grid[1][1] = '';

   let currCell = [1, 1];
   const startPosition = getPosition(1, 1);
   const startCellElem = elems[startPosition];
   
   removeWall(startCellElem);

   await delay();

   while (currCell.length > 0) {
      shuffle(dirs);
      
      let nextCell;
      const [currY, currX] = currCell;
      
      for (const dir of dirs) {
         const [dy, dx] = dir;
         const [nextY, nextX] = [currY + dy, currX + dx];
         
         if (
            nextX >= 0 &&
            nextX < gridWidth &&
            nextY >= 0 &&
            nextY < gridHeight &&
            grid[nextY][nextX] !== ''
         ) nextCell = [nextY, nextX];

         if (nextCell) {
            const [midY, midX] = [currY + dy / 2, currX + dx / 2];
            const nextPosition = getPosition(nextY, nextX);
            const midPosition = getPosition(midY, midX);
            const nextCellElem = elems[nextPosition];
            const midCellElem = elems[midPosition];

            grid[nextY][nextX] = '';
            grid[midY][midX] = '';

            removeWall(midCellElem);

            await delay();
            
            removeWall(nextCellElem);

            await delay();

            currCell = nextCell;

            break;
         }
      }

      if (!nextCell) currCell = hunt();
   }

   console.log('done');

   return grid;
}

function breadthFirstSearch(grid, elems) {
   console.log('bfs', elems);
}

function dijkstrasAlgorithm(grid, elems) {
   console.log('Dijkstra', elems);
}

export const mazeAlgorithms = {
   'backtracking': backtracking,
   'huntandkill': huntAndKill,
};

export const pathfindingAlgorithms = {
   'breadthfirstsearch': breadthFirstSearch,
   'dijsktrasalgorithm': dijkstrasAlgorithm,
};