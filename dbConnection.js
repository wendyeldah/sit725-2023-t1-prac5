// dbConnection.js
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://wendyapiyo:P8OH3e5N1SMX0RDk@cluster1.ficbrco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let collection;

async function runDBConnection() {
  try {
    await client.connect();
    collection = client.db().collection('FormData');
    console.log("Connected to MongoDB");
    return collection; 
  } catch (ex) {
    console.error("Error connecting to MongoDB:", ex);
    throw ex;
  }
}

module.exports = {
  runDBConnection
};
