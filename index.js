// const express = require('express')
// const cors = require('cors');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const app = express();
// const port =process.env.PORT   || 5000;



// app.use(cors());
// app.use(express.json())




// const uri = "mongodb+srv://shahariarronok41:mmGdJk8PlbeKkOgU@cluster0.bwilrcc.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     const database = client.db("usersDB");
//     const user = database.collection("user");
//     // await startServer();  


//     app.get('/users',async(req,res)=>{
//       const cursor=user.find()
//       const result=await cursor.toArray();
//       res.send(result);
//     })

//     app.post('/user',async(req,res)=>{
//       const newUser=req.body;
//       console.log(newUser);
//       const result = await user.insertOne(newUser);
//       res.send(result);
//       console.log(`A document was inserted with the _id: ${result.insertedId}`);
//     })



//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });

//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//     startServer();

//   }
// }



// run().catch(console.dir);




// app.get('/',(req,res)=>{
//     res.send('this is for learning simple crud operation')
// })
// app.listen(port,()=>{
//     console.log(`simple crud is running at port ,${port}`)
// })


//first one  then second



const express = require('express');
const cors = require('cors');


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  'mongodb+srv://shahariarronok41:mmGdJk8PlbeKkOgU@cluster0.bwilrcc.mongodb.net/?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const database = client.db('usersDB');
    const user = database.collection('user');

    // Set up routes after connecting to MongoDB
    app.get('/users', async (req, res) => {
      const cursor = user.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get('/users/:id',async(req,res)=>{
      const id  = req.params.id;
      const query={_id: new ObjectId(id)}
      const result=await user.findOne(query);
      res.send(result);
      
    })
    


    app.post('/user', async (req, res) => {
      const newUser = req.body;
      console.log(newUser);
      const result = await user.insertOne(newUser);
      res.send(result);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    });
    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      console.log('please delete the  id  ', id);
      const query = { _id: new ObjectId(id) }
      const result = await user.deleteOne(query)
    
      console.log('Delete result:', result);
      res.send(result);
      // res.send(result)
      // if (result.deletedCount > 0) {
      //   res.status(200).json({ success: true, deletedCount: result.deletedCount });
      // } else {
      //   res.status(404).json({ success: false, message: 'User not found or not deleted.' });
      // }

    })
    app.put('/users/:id',async(req,res)=>{
      const id=req.params.id;
      const data=req.body;
      console.log(id,data);
      const filter={_id : new ObjectId(id)}
      const options ={upsert: true}
      const updatedUser={
        $set:{
          email:data.email,
          pass:data.pass,
        }
      }
      const result= await user.updateOne(filter,updatedUser,options);
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });

    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

// Start the Express server
function startServer() {
  app.get('/', (req, res) => {
    res.send('This is for learning simple CRUD operation');
  });

  app.listen(port, () => {
    console.log(`Simple CRUD is running at port ${port}`);
  });
}

// Connect to MongoDB and start the server
connectToMongoDB().then(startServer).catch(console.dir);






// const express = require('express');
// const cors = require('cors');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// const uri =
//   'mongodb+srv://shahariarronok41:mmGdJk8PlbeKkOgU@cluster0.bwilrcc.mongodb.net/?retryWrites=true&w=majority';

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// // Connect to MongoDB and start the server only after the connection is established
// async function startServer() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     const database = client.db('usersDB');
//     const user = database.collection('user');

//     app.post('/user', async (req, res) => {
//       const newUser = req.body;
//       console.log(newUser);
//       const result = await user.insertOne(newUser);
//       res.send(result);
//       console.log(`A document was inserted with the _id: ${result.insertedId}`);
//     });

//     // Send a ping to confirm a successful connection
//     await client.db('admin').command({ ping: 1 });

//     console.log('Pinged your deployment. You successfully connected to MongoDB!');

//     // Start the Express server after the MongoDB connection is established
//     app.get('/', (req, res) => {
//       res.send('This is for learning simple CRUD operation');
//     });

//     app.listen(port, () => {
//       console.log(`Simple CRUD is running at port ${port}`);
//     });
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// }

// // Call the function to start the server
// startServer();
