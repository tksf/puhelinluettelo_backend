const express = require('express')
const app = express()
// const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// app.use(morgan('tiny'))

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post_data'))
// morgan.token('post_data', (req, res) => {
// 	return (JSON.stringify({
// 		name: req.body.name,
// 		number: req.body.number
// 	}))
// })

let persons = [
	{
	  "name": "Arto Hellas",
	  "number": "040-123456",
	  "id": 1
	},
	{
	  "name": "Ada Lovelace",
	  "number": "39-44-5323523",
	  "id": 2
	},
	{
	  "name": "Dan Abramov",
	  "number": "12-43-234345",
	  "id": 3
	},
	{
	  "name": "Mary Poppendieck",
	  "number": "39-23-6423122",
	  "id": 4
	},
	{
	  "name": "Tuomas",
	  "number": "12-43-234345",
	  "id": 5
	}
]



app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
	// const rightNow = new Date()
  res.send(`<p>Phonebook has info for ${persons.length} people</p>${new Date()}<p></p>` )
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	const person = persons.find(p => p.id === id)

  if (person) {
		res.json(person)
	} else {
		res.status(404).end()
	}
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

const generateId = () => {
	const MAX = 1000
	const MIN = 100

	return Math.floor(Math.random() * (MAX - MIN) + MIN)
}

app.post('/api/persons/', (req, res) => {
  const body = req.body
  // console.log(req.body)

  if (!body.name || !body.number) {
  	return res.status(400).json({
  		error: 'name or number missing'
  	})
  }

  let foundPerson = false
  persons.forEach((p) => {
  	if (p.name === body.name) {
  		foundPerson = true
  	}
  })

  if (foundPerson) {
  	return res.status(409).json({
			error: 'name already exists in the phonebook'
		})
  }

  const person = {
  	name: body.name,
  	number: body.number || null,
  	id: generateId()
  }

  persons = persons.concat(person)

  // console.log(person)
  // console.log(req.headers)

  res.json(person)
})

// const app = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' })
//   res.end(JSON.stringify(persons))
// })

const port = process.env.PORT || 3001
app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})

