import { useState } from 'react'

function RecipesNew() {
// handle img upload
const [file,setFile] = useState()
const [liInput,setliInput] = useState(null)
// gives img a link
const handleChange = (e) =>{
  console.log(e.target.files)
  setFile(URL.createObjectURL(e.target.files[0]))
}
// gets rid of annoying img outline 
const display = file ? true : false;


//adds li to ingredient
const handleLi =  (e)=>{
  e.preventDefault();
  

 setliInput(e.target.value)
}

console.log(liInput);


 //TODO finish form send it to the back end 
  return (
    <div>
      <form>
        <label htmlFor="image">Image</label>
        <input type="file" onChange={handleChange} name="image" />
        <ul>
          <li>{liInput}</li>
        </ul>
        &nbsp;
        <label htmlFor="ingredient">Ingredient</label>
        <input type="text" onChange={handleLi} name="ingredient"></input>
      </form>
      {/* gets rid of outline */}
      {display ? (
        <img
          alt="none"
          src={file}
          style={{ width: "700px", height: "700px" }}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default RecipesNew;