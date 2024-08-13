import styled from "styled-components";
import * as svar from '../../variables.styles';

export const Grid = styled.div`
   display: grid;
   grid-template-columns: repeat(${({$width}) => $width}, 1fr);
   border: .1rem solid ${svar.colorPrimaryLighter};
`;

export const GridCell = styled.div`
   aspect-ratio: 1;
   border: inherit;
   transition: background-color .25s;
`