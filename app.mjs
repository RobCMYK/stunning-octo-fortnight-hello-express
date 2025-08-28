import express from 'express'
import path from 'path';
// import { dirname } from 'node:path';
// import { fileURLToPath } from 'node:url';

const app = express()
const PORT = process.env.PORT || 3000; 
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')))

// app.use(express.static(path.join(__dirname, 'public'))); // Serve static files


// app.use(express.static(__dirname + 'public'));


const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.send('Hello, express from render')
// })
app.use(express.static('public'))
app.get('', (req, res) => {
  res.sendFile('rob.html', { root: 'public' })
})

// endpoints ...middleware...apis?
// send an html file

// app.listen(3000)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
//TODO: refactor to use environment port.