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
   lp: 45,
   tv: 65,
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
   setMazeAlgorithm: () => null,
   setPathfindingAlgorithm: () => null,
   gridSize: [],
   setGridSize: () => null,
   isRunning: false,
   setIsRunning: () => null,
});

export default function PathfindingProvider({children}) {
   const [mazeAlgorithm, setMazeAlgorithm] = useState(algNamesMaze.huntandkill);
   const [pathfindingAlgorithm, setPathfindingAlgorithm] = useState(algNamesPathfinding.astar);
   const [gridSize, setGridSize] = useState(getCurrentDimensions());
   const [isRunning, setIsRunning] = useState(false);

   const value = {
      mazeAlgorithm,
      setMazeAlgorithm,
      pathfindingAlgorithm,
      setPathfindingAlgorithm,
      gridSize,
      setGridSize,
      isRunning,
      setIsRunning
   }

   return <PathfindingContext.Provider value={value}>{children}</PathfindingContext.Provider>
}