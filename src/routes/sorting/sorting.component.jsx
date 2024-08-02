import * as S from './sorting.styles';
import Button, { ButtonTypes } from '../../components/button/button.component';
import Dropdown from '../../components/dropdown/dropdown.component';
import DropdownItem from '../../components/dropdown-item/dropdown-item.component';

export default function Sorting() {
   return (
      <>
         <S.ToolBar>
            <Button text={'Generate array'} styleType={ButtonTypes.filled} />
            <Dropdown name={'Algorithms'}>
               <DropdownItem name={'Heap Sort'} />
               <DropdownItem name={'Merge Sort'} />
               <DropdownItem name={'Quick Sort'} />
               <DropdownItem name={'Selection Sort'} />
               <DropdownItem name={'Bubble Sort'} />
            </Dropdown>
            <Button text={'Sort'} styleType={ButtonTypes.transparent} />
         </S.ToolBar>
      </>
   )
}