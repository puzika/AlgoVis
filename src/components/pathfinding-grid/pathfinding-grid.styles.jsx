import styled from "styled-components";
import * as svar from '../../variables.styles';

export const Grid = styled.div`
   margin: 5rem auto;
   width: 90%;
   display: grid;
   grid-template-columns: repeat(50, 1fr);
   border: .1rem solid ${svar.colorPrimaryLighter};
`;

export const GridCell = styled.div`
   aspect-ratio: 1;
   border: inherit;
`