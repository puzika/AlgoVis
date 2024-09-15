import styled from "styled-components";
import * as svar from '../../variables.styles';

export const Grid = styled.div`
   display: grid;
   border: .1rem solid ${svar.colorPrimaryLighter};
`;

export const GridCell = styled.div`
   aspect-ratio: 1;
   border: inherit;
   background-image: radial-gradient(${svar.colorPrimary} 0%, ${svar.colorPrimary} 100%);
   background-repeat: no-repeat;
   background-position: center;
   background-size: 0 0;
   transition: all .25s;
`;

export const GridCellImg = styled.img`
   display: block;
   width: 100%;
`;