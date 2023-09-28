import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as userApi from '../utils/users-api';
function RecipesNew() {
  // Handle img upload
  const [file, setFile] = useState(null);
  //TODO change the files[from zero ]
  // Handle image input
  const handleImage = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const display = !!file; // Simplified the display check

  // Handle creative text box (quill)
  const [ingredient, setIngredient] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleChangeInForm = (e) => {
    e.preventDefault();
    // Create an object with the form data
    const formData = {
      image: file,
      ingredient: ingredient,
      instructions: instructions,
    };
    userApi.newRecipesNewData(formData); // !You can now send formData to the backend
  };

  // Handle ingredient input
  const reactQuillValue0 = (e) => {
    setIngredient(e);
  };

  // Handle instructions input
  const reactQuillValue1 = (e) => {
    setInstructions(e);
  };

  return (
    <div>
      <form onSubmit={handleChangeInForm}>
        <label htmlFor="image">Image</label>
        <input type="file" onChange={handleImage} name="image" multiple />

        <label htmlFor="ingredient">Ingredient</label>
        <div className="my-editing-area">
          <ReactQuill
            style={{ backgroundColor: "white" }}
            type="text"
            theme="snow"
            value={ingredient} // Use ingredient state for value
            onChange={reactQuillValue0} // Use reactQuillValue0 for onChange
          />
        </div>
        <label htmlFor="instructions">Instructions</label>
        <div>
          <ReactQuill
            style={{ backgroundColor: "white" }}
            type="text"
            theme="snow"
            value={instructions} // Use instructions state for value
            onChange={reactQuillValue1} // Use reactQuillValue1 for onChange
          />
        </div>

        <button type="submit">Post</button>
      </form>
      {display && (
        <img
          alt="uploaded"
          src={file}
          style={{ width: "700px", height: "700px" }}
        />
      )}
    </div>
  );
}

export default RecipesNew;
