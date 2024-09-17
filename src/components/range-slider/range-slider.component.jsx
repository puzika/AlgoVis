import { useState } from 'react';
import * as S from './range-slider.styles';

export default function RangeSlider({name, min, max, value, changeHandler}) {
   return (
      <S.RangeLabel>
         <span>{name}</span>
         <S.RangeSlider onChange={changeHandler} type='range' min={min} max={max} value={value} />
      </S.RangeLabel>
   )
}