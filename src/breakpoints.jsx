import { css } from "styled-components";

const device = {
   mbmin: '400px',   // for small screen mobile
   mb: '600px',   // for mobile screen 
   tb: '900px',   // for tablets
   lp: '1280px',  // for laptops
   dt: '1440px',  // for desktops
   tv: '1920px', // for big screens
}

export const responsive = {
   mbmin: (...args) => css`
      @media only screen and (max-width: ${device.mbmin}) {
         ${css(...args)};
      }
   `,
   mb: (...args) => css`
      @media only screen and (max-width: ${device.mb}) {
         ${css(...args)};
      }
   `,
   tb: (...args) => css`
      @media only screen and (max-width: ${device.tb}) {
         ${css(...args)};
      }
   `,
   lp: (...args) => css`
      @media only screen and (max-width: ${device.lp}) {
         ${css(...args)};
      }
   `,
   dt: (...args) => css`
      @media only screen and (max-width: ${device.dt}) {
         ${css(...args)};
      }
   `,
   tv: (...args) => css`
      @media only screen and (max-width: ${device.tv}) {
         ${css(...args)};
      }
   `,
}