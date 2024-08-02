import styled from "styled-components";
import * as svar from '../../variables.styles';

export const RangeLabel = styled.label`
   display: flex;
   align-items: center;
   gap: 2.5rem;
   width: ${({width}) => width || 'auto'};
`;

export const RangeSlider = styled.input`
   width: 100%;
   outline: hidden;
`;