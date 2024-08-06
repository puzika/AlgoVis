import * as S from './sort-array-container.styles';
import {SortArrayBar} from '../sort-array-bar/sort-array-bar.component';
import { useEffect } from 'react';

export default function SortArrayContainer({array, refs}) {
   useEffect(() => {
      refs.current = refs.current.slice(0, array.length);
   }, [array]);

   return (
      <S.SortArrayContainer>
         {
            array.map((el, idx) => (
               <SortArrayBar ref={(element) => refs.current[idx] = element} key={idx} height={el} />
            ))
         }
      </S.SortArrayContainer>
   )
}