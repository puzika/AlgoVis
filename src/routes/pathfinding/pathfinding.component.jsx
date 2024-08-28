import { useContext, useState, useRef } from 'react';
import { PathfindingContext } from '../../contexts/pathfinding';
import Toolbar from '../../components/toolbar/toolbar.component';
import Button, { ButtonTypes } from '../../components/button/button.component';
import Dropdown from '../../components/dropdown/dropdown.component';
import DropdownItem from '../../components/dropdown-item/dropdown-item.component';
import Grid from "../../components/pathfinding-grid/pathfinding-grid.component";
import DataBar from "../../components/data-bar/data-bar.component";
import { algNamesPathfinding, algNamesMaze } from "./pathfinding-algorithm-names";
import { generateEmptyGrid, clearGrid, pathfindingAlgorithms, mazeAlgorithms } from './pathfinding-algorithms';
import _ from 'lodash';
import * as S from './pathfinding.styles';

function formatAlgName(algName) {
   return algName.replace(/[^A-Z0-9]+/ig, '').toLowerCase(); //REMOVE SPECIAL CHARACTERS AND CONVERT ALL UPPERCASE LETTERS TO LOWECASE ("Breadth-First Search => breadthfirstsearch")
}

export default function Pathfinding() {
   const {mazeAlgorithm, pathfindingAlgorithm, setMazeAlgorithm, setPathfindingAlgorithm} = useContext(PathfindingContext);
   const [grid, setGrid] = useState(generateEmptyGrid());
   const cellRefs = useRef([]);

   function updateGrid(updatedGrid) {
      setGrid(updatedGrid);
   }

   async function handleGenerateMaze() {
      const algName = formatAlgName(mazeAlgorithm);
      const clone = _.cloneDeep(grid);
      const newGrid = await mazeAlgorithms[algName](clone, cellRefs.current);
      setGrid(newGrid);
   }

   function handleClearGrid() {
      const emptyGrid = generateEmptyGrid();
      clearGrid(cellRefs.current);
      setGrid(emptyGrid);
   }

   async function handleFindPath() {
      const algName = formatAlgName(pathfindingAlgorithm);
      const clone = _.cloneDeep(grid);
      const newGrid = await pathfindingAlgorithms[algName](clone, [1, 1], [grid.length - 2, grid[0].length - 2], cellRefs.current);
      setGrid(newGrid);
   }

   return (
      <>
         <Toolbar>
            <Dropdown name={'Algorithms'}>
               {
                  Object.values(algNamesPathfinding).map(alg => (
                     <DropdownItem clickHandler={() => setPathfindingAlgorithm(alg)} key={alg} name={alg} />
                  ))
               }
            </Dropdown>
            <Dropdown name={'Mazes'}>
               {
                  Object.values(algNamesMaze).map(alg => (
                     <DropdownItem clickHandler={() => setMazeAlgorithm(alg)} key={alg} name={alg} />
                  ))
               }
            </Dropdown>
            <Button clickHandler={handleGenerateMaze} name={'Generate maze'} styleType={ButtonTypes.filled} />
            <Button clickHandler={handleClearGrid} name={'Clear grid'} styleType={ButtonTypes.filled} />
            <Button clickHandler={handleFindPath} name={'Find path'} styleType={ButtonTypes.transparent} />
         </Toolbar>
         <S.AppContainer>
            <DataBar algorithm={pathfindingAlgorithm} extraInfo={`Maze: ${mazeAlgorithm}`} />
            <Grid refs={cellRefs} grid={grid} updateGrid={updateGrid} start={[1, 1]} dest={[grid.length - 2, grid[0].length - 2]} />
         </S.AppContainer>
      </>
   )
}