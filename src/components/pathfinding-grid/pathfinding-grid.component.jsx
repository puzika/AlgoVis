import { useEffect, useRef } from 'react';
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
   const gridRef = useRef(null);

   useEffect(() => {
      const gridElem = gridRef.current;
      let drawing = false;
      let cleaning = false;
      let draggedElement = null;

      //DRAWING AND ERASING WALLS
      
      const onMouseDown = (e) => {
         const {target} = e;

         if (!target.classList.contains('cell')) return;    //IF THE CLICKED ELEMENT IS NOT A CELL RETURN

         e.preventDefault();     //PREVENT DRAGGING EMPTY CELL

         const idx = +target.dataset.idx;
         const [y, x] = [Math.floor(idx / cols), idx % cols];     //GET THE COORDINATES OF THE CELL FROM ITS INDEX

         if (grid[y][x] === '#') {
            cleaning = true;
            grid[y][x] = '';
            removeWall(target);
         } else {
            drawing = true;
            grid[y][x] = '#';
            addWall(target);
         }
      }

      const onMouseOver = (e) => {
         const {target} = e;

         if (!target.classList.contains('cell')) return;

         const idx = +target.dataset.idx;
         const [y, x] = [Math.floor(idx / cols), idx % cols];

         if (
            (y === startY && x === startX) ||
            (y === endY && x === endX)
         ) return;

         if (drawing) {
            grid[y][x] = '#';
            addWall(target);
         } else if (cleaning) {
            grid[y][x] = '';
            removeWall(target);
         }
      }

      const onMouseUp = (e) => {
         drawing = false;
         cleaning = false;

         const updatedGrid = cloneDeep(grid);
         updateGrid(updatedGrid);
      }

      //DRAG AND DROP

      const onDragStart = (e) => {
         const {target} = e;

         if (target.classList.contains('source') || target.classList.contains('target')) draggedElement = target;
      }

      const onDragOver = (e) => {
         e.preventDefault();
      }

      const onDrop = (e) => {
         const {target} = e;

         if (!target.classList.contains('cell')) return;

         const idx = +target.dataset.idx;
         const [y, x] = [Math.floor(idx / cols), idx % cols];

         if (draggedElement.classList.contains('source')) {
            updateCoords(currCoords => ({...currCoords, source: [y, x]}));
         } else {
            updateCoords(currCoords => ({...currCoords, dest: [y, x]}));
         }

         if (grid[y][x] === '#') {
            grid[y][x] = '';
            removeWall(target);
            updateGrid(cloneDeep(grid));
         }
      }

      //DRAWING AND ERASING EVENT LISTENERS

      gridElem.addEventListener('mousedown', onMouseDown);
      gridElem.addEventListener('mouseover', onMouseOver);
      gridElem.addEventListener('mouseup', onMouseUp); 
      
      //DRAG AND DROP EVENT LISTENERS

      gridElem.addEventListener('dragstart', onDragStart);
      gridElem.addEventListener('dragover', onDragOver);
      gridElem.addEventListener('drop', onDrop);

      return () => {
         gridElem.removeEventListener('mousedown', onMouseDown);
         gridElem.removeEventListener('mouseover', onMouseOver);
         gridElem.removeEventListener('mouseup', onMouseUp);
      }
   }, []);

   return (
      <S.Grid ref={gridRef} $width={gridWidth} >
         {
            grid.map((row, i) => (
               row.map((_, j) => (
                  <S.GridCell className='cell' ref={element => refs.current[j + i * cols] = element} key={j + i * cols} data-idx={j + i * cols}>
                     {
                        i === startY && j === startX ? <S.GridCellImg className='source' src={sourceImg} alt='start node' /> :
                        i === endY && j === endX && <S.GridCellImg className='target' src={destinationImg} alt='end node' />
                     }
                  </S.GridCell>
               )) 
            ))
         }
      </S.Grid>
   )
}