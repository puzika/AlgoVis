import styled from "styled-components";
import * as svar from '../../variables.styles';

export const DropdownItem = styled.li`
   display: block;
   text-align: center;
   padding: 2rem;
   background-image: linear-gradient(
      to right, 
      ${svar.colorPrimary}, 
      ${svar.colorBase}
   );
   background-position: bottom left;
   background-repeat: no-repeat;
   background-size: 0 .5rem;
   backface-visibility: hidden;
   transition: background-size .25s;

   &:hover {
      background-size: 100% .5rem;
   }
`;