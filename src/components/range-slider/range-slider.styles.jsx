import styled from "styled-components";
import { responsive } from "../../breakpoints";
import * as svar from '../../variables.styles';

export const RangeLabel = styled.label`
   display: flex;
   align-items: center;
   gap: 2.5rem;
   width: 15%;

   ${responsive.tb`
      width: 25%;
   `};

   ${responsive.mb`
      width: 35%;
   `};
`;

export const RangeSlider = styled.input`
   width: 100%;
   outline: none;
`;