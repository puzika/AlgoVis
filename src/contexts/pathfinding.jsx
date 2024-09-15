import { algNamesMaze, algNamesPathfinding } from "../routes/pathfinding/pathfinding-algorithm-names";
import { createContext, useState } from "react";
import { device } from "../breakpoints";

const gridHeights = {
   tb: 25,
   tv: 35,
}

const gridWidths = {
   mb: 15,
   tb: 25,
   lp: 35,
   tv: 45,
}

export function getCurrentDimensions() {
   const currentScreenWidth = window.innerWidth;
   const currentScreenHeight = window.innerHeight;

   let width;
   const height = currentScreenHeight < device.tb ? gridHeights.tb : gridHeights.tv;

   if (currentScreenWidth <= device.mb) width = gridWidths.mb;
   else if (currentScreenWidth <= device.tb) width = gridWidths.tb;
   else if (currentScreenWidth <= device.lp) width = gridWidths.lp;
   else width = gridWidths.tv;

   return [width, height];
}

export const PathfindingContext = createContext({
   mazeAlgorithm: '',
   pathfindingAlgorithm: '',
   setMazeAlgorithm: () => {},
   setPathfindingAlgorithm: () => {},
   gridSize: [],
   setGridSize: () => {},
});

export default function PathfindingProvider({children}) {
   const [mazeAlgorithm, setMazeAlgorithm] = useState(algNamesMaze.huntandkill);
   const [pathfindingAlgorithm, setPathfindingAlgorithm] = useState(algNamesPathfinding.astar);
   const [gridSize, setGridSize] = useState(getCurrentDimensions());

   const value = {
      mazeAlgorithm,
      setMazeAlgorithm,
      pathfindingAlgorithm,
      setPathfindingAlgorithm,
      gridSize,
      setGridSize,
   }

   return <PathfindingContext.Provider value={value}>{children}</PathfindingContext.Provider>
}