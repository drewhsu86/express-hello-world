const express = require('express')
const PORT = 3000

const app = express()

app.listen(PORT, () => console.log("I'm listening to port 3000"))

const users = [
  {
    id: 1,
    name: 'bruno',
    email: 'bruno@gmail.com'
  },
  {
    id: 2,
    name: 'ryan',
    email: 'ryan@gmail.com'
  },
  {
    id: 3,
    name: 'sara',
    email: 'sara@gmail.com'
  }
]

// HTTP verbs
// 4 CRUD verbs
// POST, GET, PUT, DELETE 

// Express 2 arguments for get: request and response
app.get('/', (req, res) => {
  res.send("Hello world!")
})

app.get('/fruits', (req, res) => {
  const fruits = ['apple', 'pear', 'mango']
  res.send(fruits)
})

app.get('/users/', (req, res) => {
  res.send(users)
})

// exercise 1 
app.get('/users/:id', (req, res) => {
  const id = req.params.id

  res.send(users.find((user) => {
    return user.id == id
  }))
})

// exercise 2
function firstCap(str) {
  return str[0].toUpperCase() + str.slice(1)
}

const expressUsers = ['Sophia', 'Bob', 'Kim', 'John', 'Allan', 'Chloe', 'Jen', 'Ally', 'Ben']

app.get('/expressUsers/:name', (req, res) => {
  // return if the named person is a user 
  const name = req.params.name
  const foundName = expressUsers.find((user) => {
    return user.toLowerCase() === name.toLowerCase()
  })

  res.send(foundName ? `${foundName} is a user!` : `Who is ${firstCap(name)}?`)
})

app.get('/year/:year', (req, res) => {
  // return if a year is this year, x years before or after this year,
  // or not a valid year 
  const year = req.params.year
  let msg = `${year} is not a valid year.`
  if (typeof Number(year) === 'number') {
    if (year % 1 === 0) {
      // use date to get the year 
      const today = new Date()
      const thisYear = today.getFullYear()
      const yearDiff = thisYear - year

      if (yearDiff > 0) {
        msg = `Year ${year} was ${yearDiff} years ago.`
      } else if (yearDiff < 0) {
        msg = `Year ${year} is ${-yearDiff} years from now.`
      } else if (yearDiff === 0) {
        msg = `Year ${year} is this year.`
      }
    }
  } // end of outer if bracket 

  res.send(msg)
})