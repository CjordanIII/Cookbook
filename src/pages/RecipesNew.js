import { useState } from 'react'

function RecipesNew() {

const [file,setFile] = useState()

const handleChange = (e) =>{
  console.log(e.target.files)
  setFile(URL.createObjectURL(e.target.files[0]))
}
const display = file ? "visible" : "hidden";
console.log(display)
 //TODO finish form send it to the back end 
  return (
    <div>
      <form>
        <label htmlFor="image">Image</label>
        <input type="file" onChange={handleChange} name="image" />
        <label htmlFor="Ingredient">Ingredient</label>
        <input name="ingredient"></input>
      </form>
      {/* get rid of outline */}
      <img
        alt='none'
        src={file}
        style={{ width: "700px", height: "700px" }}
      />
    </div>
  );
}

export default RecipesNew;