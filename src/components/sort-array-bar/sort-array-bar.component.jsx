import { forwardRef } from 'react';
import * as S from './sort-array-bar.styles';

export const SortArrayBar = forwardRef(({height}, ref) => {
   return (
      <S.SortArrayBar style={{height: `${height}%`}} ref={ref} />
   )
});