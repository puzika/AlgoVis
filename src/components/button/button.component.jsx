import * as S from './button.styles';

export const ButtonTypes = {
   transparent: 'transparent',
   filled: 'filled',
}

export default function Button({text, styleType}) {
   return (
      <S.Button $styleType={styleType}>{text}</S.Button>
   );
}