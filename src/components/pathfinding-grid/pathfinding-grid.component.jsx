import { gridWidth } from '../../routes/pathfinding/pathfinding-algorithms';
import sourceImg from '../../assets/source.svg';
import destinationImg from '../../assets/destination.svg';
import { addWall, removeWall } from '../../routes/pathfinding/pathfinding-algorithms';
import { cloneDeep } from 'lodash';
import * as S from './pathfinding-grid.styles';

export default function Grid({grid, refs, start, dest, updateGrid, updateCoords}) {     //start - start position; dest - end position, i.e. destination
   const [rows, cols] = [grid.length, grid[0].length];
   const [startY, startX] = start;
   const [endY, endX] = dest;
   const gridCopy = cloneDeep(grid);

   let drawing = false;
   let cleaning = false;
   let draggedElem = null;

   function isTouchEnabled() {
      return('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0);
   }

   function isSource(y, x) {
      return y === startY && x === startX;
   }

   function isTarget(y, x) {
      return y === endY && x === endX;
   }

   //DRAWING AND ERASING WALLS

   function initializeDrawing(target) {
      const idx = +target.dataset.idx;    //GET THE INDEX OF THE CELL
      const [y, x] = [Math.floor(idx / cols), idx % cols];     //GET THE COORDINATES OF THE CELL

      if (gridCopy[y][x] === '') {     //IF THE CELL IS EMPTY START DRAWING WALLS
         drawing = true;
         gridCopy[y][x] = '#';
         addWall(target);
      } else {    //IF THE CELL IS NOT EMPTY START ERASING WALLS
         cleaning = true;
         gridCopy[y][x] = '';
         removeWall(target);
      }
   }

   function keepDrawing(target) {
      const idx = +target.dataset.idx;    //GET THE INDEX OF THE CELL
      const [y, x] = [Math.floor(idx / cols), idx % cols];     //GET THE COORDINATES OF THE CELL

      if (isSource(y, x) || isTarget(y, x)) return;

      if (drawing) {    //IF DRAWING IS TRUE DRAW A WALL
         gridCopy[y][x] = '#';
         addWall(target);
      } else if (cleaning) {     //IF CLEANING IS TRUE ERASE A WALL
         gridCopy[y][x] = '';
         removeWall(target);
      }
   }

   function stopDrawing() {
      drawing = false;
      cleaning = false;
      updateGrid(gridCopy);
   }

   function handleMouseDown(e) {    //START DRAWING / ERASING WALLS
      if (isTouchEnabled()) return;    //MOUSE EVENTS SHOULD NOT TRIGGER IF DEVICE USES TOUCH

      const {target} = e;

      if (!target.classList.contains('cell')) return;    //IF CLICKED ELEMENT NOT CELL RETURN

      e.preventDefault();     //PREVENT DRAGGING CELL

      initializeDrawing(target);
   }

   function handleMouseOver(e) {    //KEEP DRAWING / ERASING WALLS 
      if (isTouchEnabled()) return;    //MOUSE EVENTS SHOULD NOT TRIGGER IF DEVICE USES TOUCH

      const {target} = e;

      if (!target.classList.contains('cell')) return;    //DO NOTHING IF THE ELEMENT THE MOUSE IS OVER IS NOT A CELL

      keepDrawing(target);
   }

   function handleMouseUp() {    //WHEN THE MOUSE UP EVENT IS TRIGGERED STOP DRAWING / CLEANING AND UPDATE GRID
      if (isTouchEnabled()) return;    //MOUSE EVENTS SHOULD NOT TRIGGER IF DEVICE USES TOUCH

      stopDrawing();
   } 

   function handleMouseLeave() {    //WHEN TEH MOUSE LEAVES THE GRID STOP DRAWING / CLEANING AND UPDATE GRID
      handleMouseUp();
   }

   //DRAWING AND ERASING WALLS (MOBILE)

   function handleTouchStart(e) {
      const {target} = e;

      if (!target.classList.contains('cell')) return; //IF THE ELEMENT IS NOT A CELL RETURN

      initializeDrawing(target);
   }

   function handleTouchMove(e) {
      const touch = e.touches[0];   //GET TOUCH ELEMENT
      const target = document.elementFromPoint(touch.clientX, touch.clientY);    //GET TOUCH DOM ELEMENT

      if (!target.classList.contains('cell')) return;    //IF ELEMENT IS NOT A CELL RETURN

      keepDrawing(target);
   }

   function handleTouchEnd() {
      stopDrawing();
   }

   //DRAG AND DROP

   function handleDragStart(e) {    //START DRAGGING
      const {target} = e;

      draggedElem = target;   //SAVE THE REF TO THE DRAGGED ELEMENT
   }

   function handleDragOver(e) {
      e.preventDefault();     //ALLOW DROP
   }

   function handleDrop(e) {
      const {target} = e;

      if (!target.classList.contains('cell')) return;  //IF THE DROPZONE IS NOT AN EMPTY CELL RETURN

      const idx = +target.dataset.idx;    //GET THE INDEX OF THE DROP CELL
      const [y, x] = [Math.floor(idx / cols), idx % cols];    //GET ITS COORDINATES

      if (isSource(y, x) || isTarget(y, x)) return;     //IF THE CELL CONTAINS THE SOURCE NODE OR THE TARGET NODE RETURN

      if (gridCopy[y][x] === '#') {    //IF THE CELL THE DRAGGED ITEM IS DROPPED ON IS A WALL REMOVE IT
         gridCopy[y][x] = '';
         removeWall(target);
         updateGrid(gridCopy);
      }

      if (draggedElem.classList.contains('source')) {      //IF THE DRAGGED ITEM IS THE SOURCE NODE UPDATE SOURCE NODE COORDINATES
         const newCoords = {
            source: [y, x],
            dest: [endY, endX]
         }

         updateCoords(newCoords);
      } else {    ////IF THE DRAGGED ITEM IS THE TARGET NODE UPDATE TARGET NODE COORDINATES
         const newCoords = {
            source: [startY, startX],
            dest: [y, x]
         }

         updateCoords(newCoords);
      }
   }

   return (
      <S.Grid 
         $width={gridWidth} 

         //DRAWING LISTENERS
         //MOUSE EVENTS
         onMouseDown={handleMouseDown}
         onMouseOver={handleMouseOver}
         onMouseUp={handleMouseUp}
         onMouseLeave={handleMouseLeave}

         //TOUCH EVENTS
         onTouchStart={handleTouchStart}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}

         //DRAG AND DROP LISTENERS

         onDragOver={handleDragOver}
         onDrop={handleDrop}
      >
         {
            grid.map((row, i) => (
               row.map((_, j) => (
                  <S.GridCell 
                     className='cell' 
                     ref={element => refs.current[j + i * cols] = element} 
                     key={j + i * cols} data-idx={j + i * cols}
                  >
                     {
                        i === startY && j === startX ? 
                        <S.GridCellImg className='source' onDragStart={handleDragStart} src={sourceImg} alt='start node' /> :
                        i === endY && j === endX && 
                        <S.GridCellImg className='target' onDragStart={handleDragStart} src={destinationImg} alt='end node' />
                     }
                  </S.GridCell>
               )) 
            ))
         }
      </S.Grid>
   )
}