import styled from "styled-components";
import { responsive } from "../../breakpoints";

export const SortArrayContainer = styled.div`
   width: 100%;
   display: flex;
   align-items: flex-end;
   gap: .2rem;
   height: 50vh;

   ${responsive.dt`
      gap: .1rem;
   `};
`;