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

function backtracking() {

}

export const mazeAlgorithms = {

};

export const pathfindingAlgorithms = {

};