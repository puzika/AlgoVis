import { useContext } from 'react';
import { ArrayContext } from '../../contexts/array';
import Toolbar from '../../components/toolbar/toolbar.component';
import Button, { ButtonTypes } from '../../components/button/button.component';
import Dropdown from '../../components/dropdown/dropdown.component';
import DropdownItem from '../../components/dropdown-item/dropdown-item.component';
import RangeSlider from '../../components/range-slider/range-slider.component';
import AppContainer from '../../components/app-container/app-container.component';
import SortDataBar from '../../components/sort-data-bar/sort-data-bar.component';
import { algNames } from './sorting-algorithm-names';
import * as S from './sorting.styles';

export default function Sorting() {
   const {size, setSize, algorithm, setAlgorithm} = useContext(ArrayContext);

   function handleChange(e) {
      setSize(e.target.value)
   }

   return (
      <>
         <Toolbar>
            <Dropdown name={'Algorithms'}>
               {
                  Object.values(algNames).map(alg => (
                     <DropdownItem clickHandler={() => setAlgorithm(alg)} key={alg} name={alg} />
                  ))
               }
            </Dropdown>
            <RangeSlider name={'Size'} width={'15%'} min='10' max='200' value={size} changeHandler={handleChange} />
            <Button name={'Generate array'} styleType={ButtonTypes.filled} />
            <Button name={'Sort'} styleType={ButtonTypes.transparent} />
         </Toolbar>
         <AppContainer>
            <SortDataBar algorithm={algorithm} size={size} />
         </AppContainer>
      </>
   )
}