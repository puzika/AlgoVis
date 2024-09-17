import { useContext, useState, useRef, useEffect } from 'react';
import { SortingContext } from '../../contexts/sorting';
import { GlobalContext } from '../../contexts/global';
import Overlay from '../../components/overlay/overlay.component';
import Toolbar from '../../components/toolbar/toolbar.component';
import HomeLink from '../../components/home-link/home-link.component';
import Button, { ButtonTypes } from '../../components/button/button.component';
import Dropdown from '../../components/dropdown/dropdown.component';
import DropdownItem from '../../components/dropdown-item/dropdown-item.component';
import RangeSlider from '../../components/range-slider/range-slider.component';
import DataBar from '../../components/data-bar/data-bar.component';
import SortArrayContainer from '../../components/sort-array-container/sort-array-container.component';
import { algNamesSort } from './sorting-algorithm-names';
import { generateRandomArray, sortAlgorithms } from './sorting-algorithms';
import { device } from '../../breakpoints';
import * as S from './sorting.styles';

const maxArraySizes = {
   mb: 100,    //MAX ARRAY SIZE FOR MOBILE
   lp: 150,    //MAX ARRAY SIZE FOR LAPTOP
   dt: 200,    //MAX ARRAY SIZE FOR DESKTOP
}

function formatAlgName(algName) {
   return algName.replace(/[^A-Z0-9]+/ig, '').toLowerCase(); //REMOVE SPECIAL CHARACTERS AND CONVERT ALL UPPERCASE LETTERS TO LOWECASE ("Heap Sort => heapsort")
}

export default function Sorting() {
   const {size, setSize, algorithm, setAlgorithm, isRunning, setIsRunning} = useContext(SortingContext);
   const {isTablet, setIsTablet} = useContext(GlobalContext);
   const [array, setArray] = useState(generateRandomArray(size));
   const [maxSize, setMaxSize] = useState(200);
   const barRefs = useRef([]);

   useEffect(() => {
      const setSizeForCurrDevice = (newSize) => {
         const defaultSize = 50;

         setMaxSize(newSize);
         setSize(defaultSize);
         setArray(generateRandomArray(defaultSize));
      }

      const updateMaxSize = () => {
         const currWidth = window.innerWidth;

         setIsTablet(window.innerWidth < device.tb);

         if (currWidth <= device.mb && maxSize !== maxArraySizes.mb) setSizeForCurrDevice(maxArraySizes.mb);
         else if (currWidth > device.mb && currWidth <= device.lp && maxSize !== maxArraySizes.lp) setSizeForCurrDevice(maxArraySizes.lp);
         else if (currWidth > device.lp && maxSize !== maxArraySizes.dt) setSizeForCurrDevice(maxArraySizes.dt);
      }

      updateMaxSize();

      window.addEventListener('resize', updateMaxSize);

      return () => window.removeEventListener('resize', updateMaxSize);
   }, [maxSize]);

   function handleChange(e) {
      const newSize = e.target.value;
      setSize(newSize);
      setArray(generateRandomArray(newSize));
   }

   function handleGenerate() {
      const newArray = generateRandomArray(size);
      setArray(newArray);
   }

   async function handleSort() {
      setIsRunning(true);
      const algName = formatAlgName(algorithm);
      const sortedArray = await sortAlgorithms[algName]([...array], barRefs.current);
      setArray(sortedArray);
      setIsRunning(false);
   }

   return (
      <>
         <Overlay isRunning={isRunning} />
         <Toolbar>
            <HomeLink/>
            <Dropdown name={'Algorithms'}>
               {
                  Object.values(algNamesSort).map(alg => (
                     <DropdownItem clickHandler={() => setAlgorithm(alg)} key={alg} name={alg} />
                  ))
               }
            </Dropdown>
            <RangeSlider name={'Size'} min='10' max={maxSize} value={size} changeHandler={handleChange} />
            {
               !isTablet && 
               <>
                  <Button clickHandler={handleGenerate} name={'Generate array'} styleType={ButtonTypes.filled} />
                  <Button clickHandler={handleSort} name={'Sort'} styleType={ButtonTypes.transparent} />
               </>
            }
         </Toolbar>
         <S.AppContainer>
            <DataBar algorithm={algorithm} extraInfo={`Size: ${size}`} />
            <SortArrayContainer refs={barRefs} array={array} />
         </S.AppContainer>
         {
            isTablet &&
            <Toolbar vertical>
               <Button clickHandler={handleGenerate} name={'Generate array'} styleType={ButtonTypes.filled} />
               <Button clickHandler={handleSort} name={'Sort'} styleType={ButtonTypes.transparent} />
            </Toolbar>
         }
      </>
   )
}