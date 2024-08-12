import * as S from './pathfinding-grid.styles';
import { gridWidth, gridHeight } from '../../routes/pathfinding/pathfinding-algorithms';

export default function Grid() {
   const cells = [];

   for (let i = 0; i < gridWidth * gridHeight; i++) cells.push(i);

   return (
      <S.Grid $width={gridWidth} >
         {
            cells.map((i) => (
               <S.GridCell key={i}></S.GridCell>
            ))
         }
      </S.Grid>
   )
}