import styled from "styled-components";
import { responsive } from "../../breakpoints";

export const ToolBar = styled.header`
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 10rem;
   padding: 0 5rem;

   ${responsive.lp`
      padding: 0 2rem;
   `};

   ${responsive.dt`
      padding: 0 2.5rem;
   `}
`;