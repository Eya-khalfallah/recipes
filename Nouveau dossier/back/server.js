const express = require('express');
const cors = require('cors');
const morgan = require("morgan")
const mongoose = require('mongoose');
const multer = require('multer');
const Recipe = require('./models/Recipe');

const app = express()
app.use(cors());
app.use(express.json())
app.use(morgan("dev"))


const port = 8080;
const upload = multer({ dest: 'uploads/' });

  
app.get('/recipes', (req, res) => {
    axios
        .get("http://localhost:8080/recipes")
        .then(function (response) {
          res.header("Access-Control-Allow-Origin", "http://localhost:3000");
          res.send(response.data);
        })
        .catch(function (error) {
          console.error(error);
          res.status(500).send("Internal Server Error");
        });
  });

// Handle POST request to '/recipes' to save a new recipe
app.post('/recipes', upload.single('image'), async (req, res) => {
    const { email, name, description, ingredients, category } = req.body;
  
// Save the submitted recipe to the database
    try {
      const recipe = new Recipe({
        email,
        name,
        description,
        ingredients,
        category,
        image: req.file.filename,
      });
      await recipe.save();
      res.sendStatus(200);
    } catch (error) {
      console.error('Error saving recipe:', error);
      res.sendStatus(500);
    }
  });
  
 
  

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectDB();
  });

// Connect to MongoDB

  function connectDB(){
    mongoose.connect('mongodb+srv://recipes:abcd1234@cluster0.7yzcvnm.mongodb.net/RECIPES_DB?retryWrites=true&w=majority')
    .then(()=>{
        console.log("connected to db")
    })
    .catch(err=>{
        console.log(err)
        console.log("error in connection")
    })
}