const { db } = require('../database')

const truncateTable = () =>
  db.none('TRUNCATE contacts RESTART IDENTITY')

const seedTable = () =>
  db.none('INSERT INTO contacts (first_name, last_name) VALUES ($1::text, $2::text)', ['Jared','Grippe'] )
    .then( () => db.none('INSERT INTO contacts (first_name, last_name) VALUES ($1::text, $2::text)', ['Tanner','Welsh']) )
    .then( () => db.none('INSERT INTO contacts (first_name, last_name) VALUES ($1::text, $2::text)', ['NeEddra','James']) )

const initializeTestDB = () =>
  truncateTable()
    .then( () => seedTable() )

module.exports = {
  truncateTable,
  initializeTestDB
}
