import * as svar from '../../variables.styles';

export const gridWidth = 50;
export const gridHeight = 20;

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
      setTimeout(resolve, 50);
   })
}

function getPosition(y, x) {
   return x + y * gridWidth;
}

function addWall(elem) {
   elem.style.backgroundColor = `${svar.colorPrimary}`;
}

async function createBorders(grid, elems) {
   for (let i = 0; i < gridWidth; i++) {
      grid[0][i] = '#';
      grid[gridHeight - 1][gridWidth - i - 1] = '#';

      const firstRowElem = elems[i];
      const lastRowElem = elems[elems.length - i - 1];

      addWall(firstRowElem);
      addWall(lastRowElem);
      await delay();
   }

   for (let i = 1; i < gridHeight; i++) {
      grid[i][0] = '#';
      grid[gridHeight - i - 1][gridWidth - 1] = '#';

      const firstColElem = elems[i * gridWidth];
      const lastColElem = elems[elems.length - i * gridWidth - 1];

      addWall(firstColElem);
      addWall(lastColElem);
      await delay();
   }
} 

async function backtracking(grid, elems) {
   createBorders(grid, elems);


}

async function huntAndKill(grid, elems) {
   createBorders(grid, elems);
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