import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our Menu</h1>
      <p className='explore-menu-text'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam soluta est incidunt esse, explicabo repellat quo amet mollitia atque laboriosam!
      </p>
      <div className="explore-menu-list">
        {
          menu_list.map((ele)=>{
            return(
                <div onClick={()=>setCategory(prev=>prev===ele.menu_name?"All":ele.menu_name)} className="explore-menu-list-item">
                  <img className={category===ele.menu_name?"active":""} src={ele.menu_image} alt="" />
                  <p>{ele.menu_name}</p>
                </div>
            )
          })
        }
      </div>
      <hr />
      
    </div>
  )
}

export default ExploreMenu