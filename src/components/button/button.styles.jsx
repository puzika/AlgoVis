import styled from "styled-components";
import * as svar from '../../variables.styles';

export const Button = styled.button`
   font-size: inherit;
   color: inherit;
   padding: 1rem 2rem;
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

   &:hover {
      background-color: ${svar.colorPrimaryLighter};
   }
`;