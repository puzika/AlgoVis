import * as S from './sort-array-container.styles';
import SortArrayBar from '../sort-array-bar/sort-array-bar.component';

export default function SortArrayContainer({array}) {
   return (
      <S.SortArrayContainer>
         {
            array.map(el => (
               <SortArrayBar key={crypto.randomUUID()} height={el} />
            ))
         }
      </S.SortArrayContainer>
   )
}