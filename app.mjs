import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Kill Jacob Fielder')
})

app.listen(3000)