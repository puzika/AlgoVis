import { useContext, useState } from 'react';
import { ArrayContext } from '../../contexts/array';
import Toolbar from '../../components/toolbar/toolbar.component';
import Button, { ButtonTypes } from '../../components/button/button.component';
import Dropdown from '../../components/dropdown/dropdown.component';
import DropdownItem from '../../components/dropdown-item/dropdown-item.component';
import RangeSlider from '../../components/range-slider/range-slider.component';
import AppContainer from '../../components/app-container/app-container.component';
import SortDataBar from '../../components/sort-data-bar/sort-data-bar.component';
import SortArrayContainer from '../../components/sort-array-container/sort-array-container.component';
import { algNames } from './sorting-algorithm-names';
import { generateRandomArray } from './sorting-algorithms';
import * as S from './sorting.styles';

export default function Sorting() {
   const {size, setSize, algorithm, setAlgorithm} = useContext(ArrayContext);
   const [array, setArray] = useState(generateRandomArray(size));

   function handleChange(e) {
      const newSize = e.target.value;
      setSize(newSize);
      setArray(generateRandomArray(newSize));
   }

   function handleGenerate() {
      const newArray = generateRandomArray(size);
      setArray(newArray);
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
            <Button clickHandler={handleGenerate} name={'Generate array'} styleType={ButtonTypes.filled} />
            <Button name={'Sort'} styleType={ButtonTypes.transparent} />
         </Toolbar>
         <AppContainer>
            <SortDataBar algorithm={algorithm} size={size} />
            <SortArrayContainer array={array} />
         </AppContainer>
      </>
   )
}