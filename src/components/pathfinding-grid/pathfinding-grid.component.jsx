import { gridWidth } from '../../routes/pathfinding/pathfinding-algorithms';
import * as S from './pathfinding-grid.styles';

export default function Grid({grid, refs}) {
   const [rows, cols] = [grid.length, grid[0].length];

   return (
      <S.Grid $width={gridWidth} >
         {
            grid.map((row, i) => (
               row.map((_, j) => (
                  <S.GridCell ref={element => refs.current[j + i * cols] = element} key={j + i * cols}></S.GridCell>
               )) 
            ))
         }
      </S.Grid>
   )
}