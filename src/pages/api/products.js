
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://pc-builder:UZCHfXFh8kd8GvMr@cluster0.fd7nv8i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run(req,res) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    const productCollection = client.db('pc-builder').collection('products')

    if(req.method === 'GET'){
      console.log(req);
        const products = await productCollection.find({}).toArray();
        res.send(products)
    }
  } catch(er){
    console.log(er);
  }
}

export default run
