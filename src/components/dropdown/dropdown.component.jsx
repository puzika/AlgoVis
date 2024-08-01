import * as S from './dropdown.styles';

export default function Dropdown({ name, children }) {
   return (
      <S.Dropdown>
         <span>{name}</span>
         <S.DropdownArrow className='arrow' />
         {children}
      </S.Dropdown>
   )
}