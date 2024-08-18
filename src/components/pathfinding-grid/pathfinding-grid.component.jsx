import { gridWidth } from '../../routes/pathfinding/pathfinding-algorithms';
import sourceImg from '../../assets/source.svg';
import destinationImg from '../../assets/destination.svg';
import * as S from './pathfinding-grid.styles';

export default function Grid({grid, refs, start, dest}) {     //start - start position; dest - end position, i.e. destination
   const [rows, cols] = [grid.length, grid[0].length];
   const [startY, startX] = start;
   const [endY, endX] = dest;

   return (
      <S.Grid $width={gridWidth} >
         {
            grid.map((row, i) => (
               row.map((_, j) => (
                  <S.GridCell ref={element => refs.current[j + i * cols] = element} key={j + i * cols}>
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