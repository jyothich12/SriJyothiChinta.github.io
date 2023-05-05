
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_DATABASE_URL;


const getDBClient = () => {

  try {

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    var client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });

    // Connect the client to the server	(optional starting in v4.7)
    client.connect();
    return client;
  } catch (error) {
    console.error(error);
  }
  finally {
  }
}

const closeDBConnection = (client) => {

  try {
    client.close();
  }
  finally {

  }
}

module.exports = { getDBClient, closeDBConnection }
