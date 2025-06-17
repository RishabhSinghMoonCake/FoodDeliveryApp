import { useState } from "react";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu.jsx";
import Header from "../../components/Header/Header.jsx";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay.jsx";
import AppDownload from "../../components/AppDownload/AppDownload.jsx";
export default function Home()
{

  const [category, setCategory]  = useState("All")

  return(
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}