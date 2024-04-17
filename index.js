const express = require("express");
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://wendyapiyo:P8OH3e5N1SMX0RDk@cluster1.ficbrco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname + '/public_html'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let collection;

async function runDBConnection() {
  try {
    await client.connect();
    collection = client.db().collection('FormData'); 
    console.log("Connected to MongoDB");
  } catch (ex) {
    console.error("Error connecting to MongoDB:", ex);
  }
}
// Handle GET request to /api/formdata
app.get('/api/cats', async (req, res) => {
  try {
    const formData = await getFormData();
    res.status(200).json({ data: formData });
  } catch (err) {
    console.error("Error fetching form data:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

async function getFormData() {
  const formData = await collection.find({}).toArray();
  return formData;
}

// Handle POST request to /api/formdata
app.post('/api/cats', async (req, res) => {
  try {
    const formData = req.body;
    await insertData(formData);
    res.status(200).json({ message: 'Form data saved successfully' });
  } catch (err) {
    console.error("Error saving form data:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

async function insertData(formData) {
  await collection.insertOne(formData);
}

// Start server and connect to MongoDB
async function startServer() {
  try {
    await runDBConnection();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (ex) {
    console.error("Error starting server:", ex);
  }
}

startServer();
