// server.js
const express = require('express');
const dbConnection = require('./dbConnection');
const catsRoutes = require('./Routes/routes');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dbConnection.runDBConnection()
  .then(collection => {
    // Pass the collection object to routes
    app.use('/api', catsRoutes(collection));
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error("Error starting server:", error);
  });
