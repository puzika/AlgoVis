import { createContext, useState } from "react";
import { device } from "../breakpoints";

export const GlobalContext = createContext({
   isTablet: false,
   setIsTablet: () => null,
});

export default function GlobalProvider({children}) {
   const [isTablet, setIsTablet] = useState(window.innerWidth < device.tb);

   const value = {isTablet, setIsTablet};

   return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}