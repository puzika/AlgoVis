import * as S from './button.styles';

export const ButtonTypes = {
   transparent: 'transparent',
   filled: 'filled',
}

export default function Button({name, styleType}) {
   return (
      <S.Button $styleType={styleType}>{name}</S.Button>
   );
}