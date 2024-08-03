import * as S from './sort-data-bar.styles';

export default function SortDataBar({size, algorithm}) {
   return (
      <S.SortDataBar>
         <p>{algorithm}</p>
         <p>Size: {size}</p>
      </S.SortDataBar>
   )
}