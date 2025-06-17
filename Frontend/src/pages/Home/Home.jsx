import { useState } from "react";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu.jsx";
import Header from "../../components/Header/Header.jsx";
import Navbar from "../../components/Navbar/navbar.jsx";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay.jsx";
export default function Home()
{

  const [category, setCategory]  = useState("All")

  return(
    <div>
      <Navbar/>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
    </div>
  )
}