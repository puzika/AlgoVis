import * as S from './sorting.styles';
import Button, { ButtonTypes } from '../../components/button/button.component';
import Dropdown from '../../components/dropdown/dropdown.component';
import DropdownContainer from '../../components/dropdown-container/dropdown-container.component';

export default function Sorting() {
   return (
      <>
         <S.ToolBar>
            <Button text={'Generate array'} styleType={ButtonTypes.filled} />
            <Dropdown name={'Algorithms'}>
               <DropdownContainer>
                  
               </DropdownContainer>
            </Dropdown>
            <Button text={'Sort'} styleType={ButtonTypes.transparent} />
         </S.ToolBar>
      </>
   )
}