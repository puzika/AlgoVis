import styled from "styled-components";
import * as svar from '../../variables.styles';

export const DropdownContainer = styled.div`
   position: absolute;
   top: 100%;
   left: 50%;
   translate: -50% .5rem;
   width: 100%;
   background-color: ${svar.colorBaseLight};
   border-radius: 2rem;
`;