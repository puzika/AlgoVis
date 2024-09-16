import { createGlobalStyle } from "styled-components";
import { responsive } from "./breakpoints";
import * as svar from './variables.styles';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;
    box-sizing: border-box;

    ${responsive.tb`
      font-size: 50%;
    `};

    ${responsive.mb`
      font-size: 45%;
    `};
  }

  body {
    font-family: "Roboto", sans-serif;
    font-size: 2rem;
    color: white;
    background-color: #101010;

    &::-webkit-scrollbar {
      width: 2rem;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: ${svar.colorPrimary};
      border: .5rem solid ${svar.colorBase};
      border-radius: 10rem;
    }
  }


  a:link,
  a:visited {
    text-decoration: none;
    color: inherit;
  }
`;