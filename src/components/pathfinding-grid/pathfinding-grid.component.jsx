import { useEffect, useRef } from 'react';
import { gridWidth } from '../../routes/pathfinding/pathfinding-algorithms';
import sourceImg from '../../assets/source.svg';
import destinationImg from '../../assets/destination.svg';
import { addWall, removeWall } from '../../routes/pathfinding/pathfinding-algorithms';
import { cloneDeep } from 'lodash';
import * as S from './pathfinding-grid.styles';

export default function Grid({grid, refs, start, dest, updateGrid}) {     //start - start position; dest - end position, i.e. destination
   const [rows, cols] = [grid.length, grid[0].length];
   const [startY, startX] = start;
   const [endY, endX] = dest;
   const gridRef = useRef(null);

   useEffect(() => {
      const gridElem = gridRef.current;
      let drawing = false;
      let cleaning = false;
      
      const onMouseDown = (e) => {
         e.preventDefault();

         const {target} = e;
         const isFilled = window.getComputedStyle(target).backgroundSize === '100% 100%';
         const idx = +target.dataset.idx;
         const [y, x] = [Math.floor(idx / cols), idx % cols];

         if (isFilled) {
            cleaning = true;
            grid[y][x] = '';
            removeWall(target);
         } else {
            drawing = true;
            grid[y][x] = '#';
            addWall(target);
         }
      }

      const onMouseUp = () => {
         drawing = false;
         cleaning = false;
         updateGrid(cloneDeep(grid));
      }

      const onMouseOver = (e) => {
         const {target} = e;

         if (!target.classList.contains('cell')) return;

         const idx = target.dataset.idx;
         const [y, x] = [Math.floor(idx / cols), idx % cols];

         if (drawing) {
            grid[y][x] = '#'
            addWall(target);
         } else if (cleaning) {
            grid[y][x] = '';
            removeWall(target);
         }
      }

      gridElem.addEventListener('mousedown', onMouseDown);
      gridElem.addEventListener('mouseover', onMouseOver);
      gridElem.addEventListener('mouseup', onMouseUp);

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
                        i === startY && j === startX ? <S.GridCellImg src={sourceImg} alt='start node' /> :
                        i === endY && j === endX && <S.GridCellImg src={destinationImg} alt='end node' />
                     }
                  </S.GridCell>
               )) 
            ))
         }
      </S.Grid>
   )
}