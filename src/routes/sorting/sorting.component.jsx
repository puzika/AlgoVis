import * as S from './sorting.styles';
import Button, { ButtonTypes } from '../../components/button/button.component';
import Dropdown from '../../components/dropdown/dropdown.component';
import DropdownItem from '../../components/dropdown-item/dropdown-item.component';
import RangeSlider from '../../components/range-slider/range-slider.component';

export default function Sorting() {
   return (
      <S.ToolBar>
         <Button name={'Generate array'} styleType={ButtonTypes.filled} />
         <Dropdown name={'Algorithms'}>
            <DropdownItem name={'Heap Sort'} />
            <DropdownItem name={'Merge Sort'} />
            <DropdownItem name={'Quick Sort'} />
            <DropdownItem name={'Selection Sort'} />
            <DropdownItem name={'Bubble Sort'} />
         </Dropdown>
         <RangeSlider width={'15%'} min='10' max='200' startValue={'50'} />
         <Button name={'Sort'} styleType={ButtonTypes.transparent} />
      </S.ToolBar>
   )
}