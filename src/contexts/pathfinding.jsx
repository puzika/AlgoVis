import { algNamesMaze, algNamesPathfinding } from "../routes/pathfinding/pathfinding-algorithm-names";
import { createContext, useState } from "react";

export const PathfindingContext = createContext({
   mazeAlgorithm: '',
   pathfindingAlgorithm: '',
   setMazeAlgorithm: () => {},
   setPathfindingAlgorithm: () => {},
});

export default function PathfindingProvider({children}) {
   const [mazeAlgorithm, setMazeAlgorithm] = useState(algNamesMaze.huntandkill);
   const [pathfindingAlgorithm, setPathfindingAlgorithm] = useState(algNamesPathfinding.astar);

   const value = {
      mazeAlgorithm,
      setMazeAlgorithm,
      pathfindingAlgorithm,
      setPathfindingAlgorithm,
   }

   return <PathfindingContext.Provider value={value}>{children}</PathfindingContext.Provider>
}