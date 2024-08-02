import { useState } from 'react';
import * as S from './range-slider.styles';

export default function RangeSlider({name, min, max, startValue, width}) {
   const [rangeValue, setRangeValue] = useState(startValue);

   function handleChange(e) {
      setRangeValue(e.target.value);
   }

   return (
      <S.RangeLabel width={width}>
         <span>Size</span>
         <S.RangeSlider onChange={handleChange} type='range' min={min} max={max} value={rangeValue} />
      </S.RangeLabel>
   )
}