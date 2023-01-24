const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const port = 3000
app.listen(port, () => console.log('Server is Runing'))

const users = [ 
  { id: 1, name: 'Sergey' },
  { id: 5, name: 'Julianna' },
  { id: 4, name: 'Daniil' },
  { id: 3, name: 'Pasha' },
  { id: 2, name: 'Denis' }
]

const jsonParser = bodyParser.json()

app.get( '/user', (req, res) => res.send(users))
app.post( '/user', jsonParser, (req, res) => {

  console.log(req.body)
  users.push(req.body)
  res.status(201)
  res.send(users)
})

app.put( '/user/:id',jsonParser, (req, res)=>{
  console.log(`${req.params.id}: ${req.body}`);
  const updateUsers = users.map( i => ( i.id == req.params.id ? req.body : i ))
  console.log(updateUsers);
  users.splice(0, users.length, ...updateUsers)
  res.send(users)
})

app.delete( '/user/:id', (req, res) => {
  console.log(req.params.id)
  const id = users.findIndex( i => i.id === req.params.id)
  users.splice(id, 1)
  res.send(`${id}`)
})