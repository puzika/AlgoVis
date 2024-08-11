import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Sorting from "./routes/sorting/sorting.component";
import Pathfinding from "./routes/pathfinding/pathfinding.component";

export default function App() {
  return (
    <Routes>
      <Route index element={<Home></Home>}></Route>
      <Route path="sorting" element={<Sorting></Sorting>}></Route>
      <Route path="pathfinding" element={<Pathfinding></Pathfinding>}></Route>
    </Routes>
  )
}