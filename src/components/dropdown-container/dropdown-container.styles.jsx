import styled from "styled-components";
import * as svar from '../../variables.styles';

export const DropdownContainer = styled.ul`
   position: absolute;
   top: 100%;
   left: 50%;
   translate: -50% .5rem;
   min-width: 100%;
   background-color: ${svar.colorBaseLight};
   border-radius: 2rem;
   visibility: hidden;
   opacity: 0;
   transition: all .5s;
   overflow: hidden;
`;