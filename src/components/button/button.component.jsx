import * as S from './button.styles';

export const ButtonTypes = {
   transparent: 'transparent',
   filled: 'filled',
}

export default function Button({name, styleType, clickHandler}) {
   return (
      <S.Button onClick={clickHandler} $styleType={styleType}>{name}</S.Button>
   );
}