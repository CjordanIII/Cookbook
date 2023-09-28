import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as userApi from '../utils/users-api';
function RecipesNew() {
  // Handle img upload
  const [file, setFile] = useState(null);

  // Handle image input
  const handleImage = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const display = !!file; // Simplified the display check

  // Handle creative text box (quill)
  const [ingredient, setIngredient] = useState("");
  const [instructions, setInstructions] = useState("");

  // Handle ingredient input
  const reactQuillValue0 = (e) => {
    if (!isReactQuillEmpty(e)) {
      setIngredient(e);
    } else {
      alert("Cannot leave Ingredients empty");
    }
  };

  // Handle instructions input
  const reactQuillValue1 = (e) => {
    if (!isReactQuillEmpty(e)) {
      setInstructions(e);
    } else {
      alert("Cannot leave Instructions empty");
    }
  };
  // makes sure text box does not only contain spaces returns bool
  function isReactQuillEmpty(content) {
    const regex = /(<([^>]+)>)/gi;
    const cleanedContent = content.replace(regex, "").trim();
    return cleanedContent.length === 0;
  }
// disables buttons if the text boxes contain only spaces
  const isIngredientEmpty = isReactQuillEmpty(ingredient);
  const isInstructionsEmpty = isReactQuillEmpty(instructions);
  const isFormEmpty = isIngredientEmpty || isInstructionsEmpty;


  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the form data
    const storedId = localStorage.getItem("SEItoken");
    const formData = {
      image: file,
      ingredient: ingredient,
      instructions: instructions,
      token: storedId,
    };

    // Send formData to the backend (you can uncomment this part)
    userApi.newRecipesNewData(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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

        <button disabled={isFormEmpty} type="submit">
          Post
        </button>
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
