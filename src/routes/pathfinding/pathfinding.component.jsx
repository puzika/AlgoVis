import { useContext, useState, useRef, useEffect } from 'react';
import { PathfindingContext } from '../../contexts/pathfinding';
import { GlobalContext } from '../../contexts/global';
import Overlay from '../../components/overlay/overlay.component';
import Toolbar from '../../components/toolbar/toolbar.component';
import HomeLink from '../../components/home-link/home-link.component';
import Button, { ButtonTypes } from '../../components/button/button.component';
import Dropdown from '../../components/dropdown/dropdown.component';
import DropdownItem from '../../components/dropdown-item/dropdown-item.component';
import Grid from "../../components/pathfinding-grid/pathfinding-grid.component";
import DataBar from "../../components/data-bar/data-bar.component";
import { algNamesPathfinding, algNamesMaze } from "./pathfinding-algorithm-names";
import { generateEmptyGrid, clearGrid, pathfindingAlgorithms, mazeAlgorithms } from './pathfinding-algorithms';
import { getCurrentDimensions } from '../../contexts/pathfinding';
import { device } from '../../breakpoints';
import _ from 'lodash';
import * as S from './pathfinding.styles';

function formatAlgName(algName) {
   return algName.replace(/[^A-Z0-9]+/ig, '').toLowerCase(); //REMOVE SPECIAL CHARACTERS AND CONVERT ALL UPPERCASE LETTERS TO LOWECASE ("Breadth-First Search => breadthfirstsearch")
}

export default function Pathfinding() {
   const {
      mazeAlgorithm, 
      pathfindingAlgorithm, 
      setMazeAlgorithm, 
      setPathfindingAlgorithm, 
      gridSize, 
      setGridSize,
      isRunning,
      setIsRunning
   } = useContext(PathfindingContext);
   const {isTablet, setIsTablet} = useContext(GlobalContext);
   const [gridWidth, gridHeight] = gridSize;
   const [grid, setGrid] = useState(generateEmptyGrid(gridHeight, gridWidth));
   const [coords, setCoords] = useState({ source: [1, 1], dest: [gridHeight - 2, gridWidth - 2]});
   const cellRefs = useRef([]);

   useEffect(() => {
      const updateSize = () => {
         const [newWidth, newHeight] = getCurrentDimensions();

         setIsTablet(window.innerWidth < device.tb);

         if (newWidth !== gridWidth || newHeight !== gridHeight) {
            clearGrid(cellRefs.current);
            setGridSize([newWidth, newHeight]);
            setGrid(generateEmptyGrid(newHeight, newWidth));
            setCoords({...coords, dest: [newHeight - 2, newWidth - 2]});
         }
      }

      window.addEventListener('resize', updateSize);

      return () => window.removeEventListener('resize', updateSize);
   }, [gridSize]);

   useEffect(() => {
      cellRefs.current = cellRefs.current.slice(0, gridWidth * gridHeight);      //UPDATE REFS
   }, [grid]);

   async function handleGenerateMaze() {
      setIsRunning(true);
      const algName = formatAlgName(mazeAlgorithm);
      const clone = _.cloneDeep(grid);
      const newGrid = await mazeAlgorithms[algName](clone, coords.source, coords.dest, cellRefs.current);
      setGrid(newGrid);
      setIsRunning(false);
   }

   function handleClearGrid() {
      const emptyGrid = generateEmptyGrid(gridHeight, gridWidth);
      clearGrid(cellRefs.current);
      setGrid(emptyGrid);
   }

   async function handleFindPath() {
      setIsRunning(true);
      const algName = formatAlgName(pathfindingAlgorithm);
      const clone = _.cloneDeep(grid);
      const newGrid = await pathfindingAlgorithms[algName](clone, coords.source, coords.dest, cellRefs.current);
      setGrid(newGrid);
      setIsRunning(false);
   }

   return (
      <>
         <Overlay isRunning={isRunning} />
         <Toolbar>
            <HomeLink />
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
            {
               !isTablet &&
               <>
                  <Button clickHandler={handleGenerateMaze} name={'Generate maze'} styleType={ButtonTypes.filled} />
                  <Button clickHandler={handleClearGrid} name={'Clear grid'} styleType={ButtonTypes.filled} />
                  <Button clickHandler={handleFindPath} name={'Find path'} styleType={ButtonTypes.transparent} />
               </>
            }
         </Toolbar>
         <S.AppContainer>
            <DataBar algorithm={pathfindingAlgorithm} extraInfo={`Maze: ${mazeAlgorithm}`} />
            <Grid refs={cellRefs} grid={grid} updateGrid={setGrid} updateCoords={setCoords} start={coords.source} dest={coords.dest} />
         </S.AppContainer>
         {
            isTablet &&
            <Toolbar vertical>
               <Button clickHandler={handleGenerateMaze} name={'Generate maze'} styleType={ButtonTypes.filled} />
               <Button clickHandler={handleClearGrid} name={'Clear grid'} styleType={ButtonTypes.filled} />
               <Button clickHandler={handleFindPath} name={'Find path'} styleType={ButtonTypes.transparent} />
            </Toolbar>
         }
      </>
   )
}