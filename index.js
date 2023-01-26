require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
// require('dotenv').load()


const jsonParser = bodyParser.json()

const app = express()

const port = process.env.PORT
console.log(process.env.PORT);
app.listen(port, () => console.log('Server is Runing' + port))

const users = [ 
  { id: 1, name: 'Sergey', isMan: true , age: 31 },
  { id: 5, name: 'Julianna', isMan: false , age: 28 },
  { id: 4, name: 'Daniil', isMan: true , age: 1 },
  { id: 3, name: 'Pasha', isMan: true , age: 42 },
  { id: 2, name: 'Denis', isMan: true , age: 31 },
  { id: 6, name: 'Piter', isMan: true, age: 56}
]


// get all users
app.get( '/users', (req, res) => res.send(users))

//get user gender #male #female
app.get( '/users/:gender', (req, res) => {
  console.log(req.params.gender);
  const isMan = req.params.gender
  if ( isMan === "male" ) res.send( users.filter( i => i.isMan == true))
  if ( isMan === "female" ) res.send( users.filter( i => i.isMan == false))
})

// get user filter age #min #max
app.get( '/filtredUsers', (req, res) => {
  console.log(req.query)
  const minAge = req.query.min
  const maxAge = req.query.max
  const filterAge = users.filter( i =>{
      if (i.age >= minAge && i.age <= maxAge){ return i }
  })
  console.log(filterAge);
  res.send(filterAge)
})

// add new user { id: ... , name: '...', isMan: boolean , age: ...  }
app.post( '/user', jsonParser, (req, res) => {
  console.log(req.body)
  users.push(req.body)
  res.status(201)
  res.send(users.at(-1))
})


// refresh user all pametrs { id: ... , name: '...', isMan: boolean , age: ...  }
app.put( '/user/:id',jsonParser, (req, res)=>{
  console.log(`${req.params.id}: ${req.body}`);
  const id = req.params.id
  const updateUsers = users.map( i => ( i.id == id ? req.body : i ))
  console.log(updateUsers);
  users.splice(0, users.length, ...updateUsers)
  res.send(users.filter( i => i.id == id))
})

// refresh user pametr
app.patch( '/user/:id', jsonParser, (req, res) => {
  const id = req.params.id
  const updUser = req.body
  const createUsers = users.filter( i => ( i.id == id ))
  const createUser = Object.assign(...createUsers, updUser)
  res.send(createUser)
})

// delete user { id: ... }
app.delete( '/user/:id', (req, res) => {
  console.log(req.params.id)
  const id = users.findIndex( i => i.id === req.params.id)
  users.splice(id, 1)
  res.send(`${id}`)
})
