import { createGlobalStyle } from "styled-components";
import { responsive } from "./breakpoints";

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
    
    ${
      responsive.mb`
        font-size: 45%;
      `
    };

    ${
      responsive.mbmin`
        font-size: 40%;
      `
    };
  }

  body {
    font-family: "Roboto", sans-serif;
    font-size: 2rem;
    color: white;
    background-color: #101010;
  }


  a:link,
  a:visited {
    text-decoration: none;
    color: inherit;
  }
`;