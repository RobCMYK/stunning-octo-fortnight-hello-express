import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// import { dirname } from 'node:path';
// import { fileURLToPath } from 'node:url';

const app = express()
const PORT = process.env.PORT || 3000; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);


app.use(express.static(path.join(__dirname + 'public'))); // Serve static files

app.use(express.json()); // for parsing application/json

const uri = process.env.uri;



app.get('/', (req, res) => {
  res.send('Hello Express from Render 😍😍😍. <a href="rob">rob</a>')
})

// endpoints...middlewares...apis? 
// send an html file

app.get('/rob', (req, res) => {
  // res.send('rob. <a href="/">home</a>')
  res.sendFile(path.join(__dirname, 'public','rob.html')) 

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