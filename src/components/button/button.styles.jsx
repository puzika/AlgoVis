import styled from "styled-components";
import * as svar from '../../variables.styles';

export const Button = styled.button`
   font-size: inherit;
   color: inherit;
   padding: 0 2rem;
   height: 4.5rem;
   flex-shrink: 0;
   border: .2rem solid ${svar.colorPrimaryLight}; 
   border-radius: 10rem;
   outline: none;
   box-shadow: 0 0 2rem ${svar.colorPrimaryLightWithOpacity(.8)};
   cursor: pointer;
   transition: background-color .2s;

   background-color: ${({$styleType}) => 
      $styleType === 'transparent' ? 'transparent' :
      $styleType === 'filled' ? svar.colorPrimaryLight :
      'transparent'
   };

   @media (hover: hover) {
      &:hover {
         background-color: ${svar.colorPrimaryLighter};
      }
   }
`;