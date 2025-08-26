import express from 'express'

const app = express()

const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.send('Hello, express from render')
// })
app.use(express.static('public'))
app.get('/rob', (req, res) => {
  res.sendFile('rob.html', { root: '.' })
})

// endpoints ...middleware...apis?
// send an html file

// app.listen(3000)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
//TODO: refactor to use environment port.