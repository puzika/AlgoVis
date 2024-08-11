import * as S from './pathfinding-grid.styles';

export default function Grid() {
   const cells = [];

   for (let i = 0; i < 1000; i++) cells.push(i);
   console.log(cells);

   return (
      <S.Grid>
         {
            cells.map((i) => (
               <S.GridCell key={i}></S.GridCell>
            ))
         }
      </S.Grid>
   )
}