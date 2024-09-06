import { css } from "styled-components";

export const device = {
   mbmin: 400,   // for small screen mobile
   mb: 600,   // for mobile screen 
   tb: 900,   // for tablets
   lp: 1280,  // for laptops
   dt: 1440,  // for desktops
   tv: 1920, // for big screens
}

export const responsive = {
   mbmin: (...args) => css`
      @media only screen and (max-width: ${device.mbmin}px) {
         ${css(...args)};
      }
   `,
   mb: (...args) => css`
      @media only screen and (max-width: ${device.mb}px) {
         ${css(...args)};
      }
   `,
   tb: (...args) => css`
      @media only screen and (max-width: ${device.tb}px) {
         ${css(...args)};
      }
   `,
   lp: (...args) => css`
      @media only screen and (max-width: ${device.lp}px) {
         ${css(...args)};
      }
   `,
   dt: (...args) => css`
      @media only screen and (max-width: ${device.dt}px) {
         ${css(...args)};
      }
   `,
   tv: (...args) => css`
      @media only screen and (max-width: ${device.tv}px) {
         ${css(...args)};
      }
   `,
}