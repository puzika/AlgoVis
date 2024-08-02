import styled from "styled-components";
import * as svar from '../../variables.styles';

const arrowHeight = 1.5;
const arrowWidth = arrowHeight;
const arrowMarginBottom = arrowHeight * Math.sqrt(2) / 2 - arrowHeight / 2;

export const Dropdown = styled.div`
   position: relative;
   display: flex;
   align-items: center;
   height: 4.5rem;
   padding: 0 2.5rem;
   border-radius: 10rem;
   transition: background-color .5s;
   cursor: pointer;

   &:hover {
      background-color: ${svar.colorBaseLight};

      .dropdown-arrow {
         margin-bottom: 0;
         margin-top: ${arrowMarginBottom}rem;
         rotate: X 180deg;
      }

      ul {
         visibility: visible;
         opacity: 1;
      }
   }
`;

export const DropdownArrow = styled.span`
   width: ${arrowWidth}rem;
   height: ${arrowHeight}rem;
   border-right: .25rem solid #fff;
   border-bottom: .25rem solid #fff;
   transform: rotate(45deg);
   margin-left: 2rem;
   margin-bottom: ${arrowMarginBottom}rem;
   transition: all .25s;
`;