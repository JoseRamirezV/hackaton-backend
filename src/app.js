const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}))

app.set('port', process.env.PORT || 5000)

app.use('/api/users', require('#routes/users.routes'))
app.use('/api/application', require('#routes/application.routes'))
app.use('/api/rating', require("#routes/rating.routes"))

module.exports = app