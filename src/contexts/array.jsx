import { createContext, useState } from "react";
import { algNamesSort } from "../routes/sorting/sorting-algorithm-names";

export const ArrayContext = createContext({
   size: 0,
   algorithm: '',
   setSize: () => null,
   setAlgorithm: () => null,
});

export default function ArrayProvider({children}) {
   const [size, setSize] = useState(50);
   const [algorithm, setAlgorithm] = useState(algNamesSort.heapsort);

   const value = {size, setSize, algorithm, setAlgorithm};

   return <ArrayContext.Provider value={value} >{children}</ArrayContext.Provider>
}