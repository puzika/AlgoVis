import { createContext, useState } from "react";
import { algNamesSort } from "../routes/sorting/sorting-algorithm-names";

export const SortingContext = createContext({
   size: 0,
   algorithm: '',
   setSize: () => null,
   setAlgorithm: () => null,
   isRunning: false,
   setIsRunning: () => null,
});

export default function SortingProvider({children}) {
   const [size, setSize] = useState(50);
   const [algorithm, setAlgorithm] = useState(algNamesSort.heapsort);
   const [isRunning, setIsRunning] = useState(false);

   const value = {size, setSize, algorithm, setAlgorithm, isRunning, setIsRunning};

   return <SortingContext.Provider value={value} >{children}</SortingContext.Provider>
}