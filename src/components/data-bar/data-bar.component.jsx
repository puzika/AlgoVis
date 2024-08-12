import * as S from './data-bar.styles';

export default function DataBar({algorithm, extraInfo}) {
   return (
      <S.DataBar>
         <p>{algorithm}</p>
         <p>{extraInfo}</p>
      </S.DataBar>
   )
}