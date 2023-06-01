const express = require('express');
const path = require('path');

const app = express();
const port = 8080;


app.get('/recipes', (req, res) => {
  axios
      .get("http://localhost:5000/recipes")
      .then(function (response) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.send(response.data);
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      });
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
