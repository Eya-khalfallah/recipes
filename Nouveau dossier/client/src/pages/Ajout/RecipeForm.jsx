import React, { useState } from 'react';

const RecipeForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

 
  const apiUrl = 'http://localhost:8080';


  const handleSubmit = async (event) => {
    event.preventDefault();

    
    // Create a FormData object to send the form data
    const formData = new FormData();
    formData.append('email', email);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('ingredients', ingredients.join(','));
    formData.append('category', category);
    formData.append('image', image);

    // Send the recipe data to the server
    try {
      const response = await fetch(`${apiUrl}/recipes`, {
        method: 'POST',
        body: formData,
      });      

      if (response.ok) {
        // Recipe was successfully saved
        // Reset form fields
        setEmail('');
        setName('');
        setDescription('');
        setIngredients([]);
        setCategory('');
        setImage(null);
      } else {
        // Handle error response
      }
    } catch (error) {
      // Handle fetch or server connection error
    }
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleIngredientChange = (event, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  return (
    <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-12">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Recipe Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="col-12">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="form-control"
            cols="30"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="col-12">
          <label htmlFor="ingredients" className="form-label">
            Ingredients
          </label>
          <br />
          <small>Example: Ice</small>
          <div className="ingredientList">
            {ingredients.map((ingredient, index) => (
              <div className="ingredientDiv mb-1" key={index}>
                <input
                  type="text"
                  name="ingredients"
                  className="form-control"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-outline-primary" onClick={handleAddIngredient}>
            + Ingredient
          </button>
        </div>

        <div className="col-12">
          <label htmlFor="category">Select Category</label>
          <select
            className="form-select form-control"
            name="category"
            aria-label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select Category</option>
            <option value="Thai">Thai</option>
            <option value="American">American</option>
            <option value="Chinese">Chinese</option>
            <option value="Mexican">Mexican</option>
            <option value="Indian">Indian</option>
          </select>
        </div>

        <div className="col-12">
          <label htmlFor="image">Product Image</label>
          <input
            type="file"
            className="form-control"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Submit Recipe
          </button>
        </div>
      </div>
    </form>
  );
};

export default RecipeForm;
