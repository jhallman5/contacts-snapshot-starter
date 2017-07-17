const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const app = express()
const {renderError} = require('./server/utils')
const contacts = require('./server/routes/contacts')
const { enviromentConfig } = require('./config')

const port = process.env.PORT || enviromentConfig(process.env.NODE_ENV).PORT

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use((request, response, next) => {
  response.locals.query = ''
  next()
})

app.get('/', (request, response) => {
  const contacts = database.getContacts()
  .then((contacts) => {response.render('index', { contacts })})
  .catch( err => console.log('err', err) )
})

app.use('/contacts', contacts)

app.use((request, response) => {
  response.render('not_found')
})

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
  console.log(`Running in a ${process.env.NODE_ENV} enviroment`)
})

module.exports = {app}
