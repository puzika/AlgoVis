import DropdownContainer from '../dropdown-container/dropdown-container.component';
import * as S from './dropdown.styles';

export default function Dropdown({ name, children }) {
   return (
      <S.Dropdown>
         <span>{name}</span>
         <S.DropdownArrow className='dropdown-arrow' />
         <DropdownContainer>
            {children}
         </DropdownContainer>
      </S.Dropdown>
   )
}