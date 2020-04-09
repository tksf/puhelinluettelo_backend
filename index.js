require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// app.use(morgan('tiny'))

const morgan = require('morgan')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post_data'))
morgan.token('post_data', (req, res) => {
	return (JSON.stringify({
		name: req.body.name,
		number: req.body.number
	}))
})

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
	Person.find({}).then(persons => {
		res.send(`<p>Phonebook has info for ${persons.length} people</p>${new Date()}<p></p>` )
	})
})

// app.get('/api/persons', (req, res) => {
//   res.json(persons)
// })
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// app.get('/api/persons/:id', (req, res) => {
// 	const id = Number(req.params.id)
// 	const person = persons.find(p => p.id === id)

//   if (person) {
// 		res.json(person)
// 	} else {
// 		res.status(404).end()
// 	}
// })

// app.delete('/api/persons/:id', (req, res) => {
//   const id = Number(req.params.id)
//   persons = persons.filter(p => p.id !== id)

//   res.status(204).end()
// })

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = () => {
	const MAX = 1000
	const MIN = 100

	return Math.floor(Math.random() * (MAX - MIN) + MIN)
}

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

// , runValidators: true, context: 'query' 
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (req, res, next) => {
  const body = req.body
  // console.log(req.body)

  if (!body.name || !body.number) {
  	return res.status(400).json({
  		error: 'name or number missing'
  	})
  }


///
	const person = new Person({
	  name: body.name,
	  number: body.number,
	})

	person.save().then(savedPerson => {
	  console.log(`saved: ${person}`)
	  // console.log(savedPerson.toJSON())
	  res.json(savedPerson.toJSON())
  })
  .catch(error => next(error))
})

////////////


  // let foundPerson = false
  // persons.forEach((p) => {
  // 	if (p.name === body.name) {
  // 		foundPerson = true
  // 	}
  // })

  // if (foundPerson) {
  // 	return res.status(409).json({
		// 	error: 'name already exists in the phonebook'
		// })
  // }

  // const person = {
  // 	name: body.name,
  // 	number: body.number || null,
  // 	id: generateId()
  // }

  // persons = persons.concat(person)

  // // console.log(person)
  // // console.log(req.headers)

  // res.json(person)


// const app = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' })
//   res.end(JSON.stringify(persons))
// })

const unknownEndpoint = (request, response) => {
	console.error('unknown endpoint called')
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const port = process.env.PORT || 3001
app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})

