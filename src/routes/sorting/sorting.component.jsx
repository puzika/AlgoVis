import { Link } from 'react-router-dom';
import Toolbar from '../../components/toolbar/toolbar.component';
import Button, { ButtonTypes } from '../../components/button/button.component';
import Dropdown from '../../components/dropdown/dropdown.component';
import DropdownItem from '../../components/dropdown-item/dropdown-item.component';
import RangeSlider from '../../components/range-slider/range-slider.component';
import HomeIcon from '../../assets/home.svg';
import * as S from './sorting.styles';

export default function Sorting() {
   return (
      <Toolbar>
         <Link to={'/'}><S.Img src={HomeIcon} /></Link>
         <Dropdown name={'Algorithms'}>
            <DropdownItem name={'Heap Sort'} />
            <DropdownItem name={'Merge Sort'} />
            <DropdownItem name={'Quick Sort'} />
            <DropdownItem name={'Selection Sort'} />
            <DropdownItem name={'Bubble Sort'} />
         </Dropdown>
         <RangeSlider width={'15%'} min='10' max='200' startValue={'50'} />
         <Button name={'Generate array'} styleType={ButtonTypes.filled} />
         <Button name={'Sort'} styleType={ButtonTypes.transparent} />
      </Toolbar>
   )
}