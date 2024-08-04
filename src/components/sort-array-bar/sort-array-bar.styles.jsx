import styled from "styled-components";
import * as svar from '../../variables.styles';

export const SortArrayBar = styled.div`
   flex: 1;
   height: ${({height}) => height}rem;
   background-image: linear-gradient(to bottom, ${svar.colorPrimaryLighter}, ${svar.colorPrimary}, ${svar.colorBase});
`;