import { useEffect, useState } from 'react';
import * as userApi from '../utils/users-api';
function Recipes() {
  const [data,setData] = useState(null)
  userApi.getRecipesNewData()
  useEffect(()=>{
    async function fetchData(){
      try{
        //TODO change to a certain amount
        const response = await fetch("/api/users/recipes");
        const jsonData = await response.json()
        setData(jsonData)
      }catch(e){
        console.log(e)
      }
    }
    fetchData()
  },[])
    console.log(data)


//!! start here 

    
  return (
    <div>
      <h1>Recipes pages</h1>
    </div>
  );
}

export default Recipes;