import 'dotenv/config'; // Load environment variables from .env file
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';
// import { dirname } from 'node:path';
// import { fileURLToPath } from 'node:url';

const app = express()
const PORT = process.env.PORT || 3000; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uri = process.env.MONGO_URI;
console.log("get uri from env?", uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.use(express.urlencoded({ extended: true })); // Parse form data 
app.use(express.static(path.join(__dirname + 'public'))); // Serve static files
app.use(express.json()); // for parsing application/json


app.get('/', (req, res) => {
  res.send('Hello Express from Render 😍😍😍. <a href="rob">rob</a> <a href="trad">Trad Form</a>')

})

app.get('/rob', (req, res) => {
  // res.send('rob. <a href="/">home</a>')
  res.sendFile(path.join(__dirname, 'public','rob.html')) 

})

app.get('/trad', (req, res) => {
  // res.send('trad. <a href="/">home</a>')
  res.sendFile(path.join(__dirname, 'public','traditional-forms.html')) 

})

app.get('/api/rob', (req, res) => {
  const myVar = "Hello from Rob API"
  res.json({message: myVar})

})

app.get('/api/query', (req, res) => {
  const name = req.query.name;
  res.json({"message": `Hi ${name}, how are you?`}); 

});

app.get('/api/url/:id', (req, res) => {
  console.log("Client responds with URL param:", req.params.id);
  res.json({"message": `Hi ${req.params.id}, how are you?`});

});

app.post('/api/body', (req, res) => {
  console.log("Client responds with body:", req.body.name);
  const name = req.body.name;
  res.json({"message": `Hi ${name}, how are you?`});

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)

})

// TRADITIONAL FORM ENDPOINTS - SIMPLIFIED
// These handle regular HTML form submissions and redirect back

// Traditional Form - Add Student (POST with form data)
app.post('/api/students/form', async (req, res) => {
  try {
    const { name, age, grade } = req.body;
    
    // Simple validation
    if (!name || !age || !grade) {
      console.log('❌ Form validation failed: Missing required fields');
      return res.redirect('/traditional-forms.html?error=missing-fields');
    }

    const student = { name, age: parseInt(age), grade };
    const result = await db.collection('students').insertOne(student);
    
    console.log(`✅ Student added: ${name} (ID: ${result.insertedId})`);
    res.redirect('/traditional-forms.html?success=student-added');
  } catch (error) {
    console.error('❌ Error adding student:', error.message);
    res.redirect('/traditional-forms.html?error=database-error');
  }
});