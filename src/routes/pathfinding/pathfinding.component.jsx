import { algNamesPathfinding, algNamesMaze } from "./pathfinding-algorithm-names";
import Toolbar from '../../components/toolbar/toolbar.component';
import Button, { ButtonTypes } from '../../components/button/button.component';
import Dropdown from '../../components/dropdown/dropdown.component';
import DropdownItem from '../../components/dropdown-item/dropdown-item.component';
import Grid from "../../components/pathfinding-grid/pathfinding-grid.component";

export default function Pathfinding() {
   function handleGenerate() {

   }

   function handleFindPath() {

   }

   return (
      <>
         <Toolbar>
            <Dropdown name={'Algorithms'}>
               {
                  Object.values(algNamesPathfinding).map(alg => (
                     <DropdownItem clickHandler={() => setAlgorithm(alg)} key={alg} name={alg} />
                  ))
               }
            </Dropdown>
            <Dropdown name={'Mazes'}>
               {
                  Object.values(algNamesMaze).map(alg => (
                     <DropdownItem clickHandler={() => setAlgorithm(alg)} key={alg} name={alg} />
                  ))
               }
            </Dropdown>
            <Button clickHandler={handleGenerate} name={'Generate maze'} styleType={ButtonTypes.filled} />
            <Button clickHandler={handleFindPath} name={'Find path'} styleType={ButtonTypes.transparent} />
         </Toolbar>
         <Grid />
      </>
   )
}