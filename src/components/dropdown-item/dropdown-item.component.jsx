import * as S from './dropdown-item.styles';

export default function DropdownItem({name, clickHandler}) {
   return (
      <S.DropdownItem onClick={clickHandler}>{name}</S.DropdownItem>
   )
}