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
      setTimeout(resolve, 25);
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

   async function backtrack(currY = 1, currX = 1) {   //START AT [1, 1], BECAUSE THE GRID IS SURROUNDED BY WALLS
      const currPosition = getPosition(currY, currX);
      const currElem = elems[currPosition];
      
      grid[currY][currX] = '';
      removeWall(currElem);

      await delay();

      shuffle(dirs);

      for (const dir of dirs) {
         const [dy, dx] = dir;
         const [nextY, nextX] = [currY + dy, currX + dx];

         if (
            nextY >= 0 &&
            nextY < gridHeight &&
            nextX >= 0 &&
            nextX < gridWidth &&
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