import { createGlobalStyle } from "styled-components";

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
  }

  body {
    font-family: "Roboto", sans-serif;
    font-size: 1.6rem;
    color: white;
    background-color: #101010;
  }


  a:link,
  a:visited {
    text-decoration: none;
    color: inherit;
  }
`;