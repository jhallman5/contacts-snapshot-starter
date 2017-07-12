const { expect } = require('chai')
const { initializeTestDB } = require('../test-utilities')
const queries = require('../../database')

beforeEach( () =>
  initializeTestDB()
)

describe('Database Integration', () => {
  context('createContact()', () => {
    const testContact = {
      first_name: 'John',
      last_name: 'Hallman'
    }

    it('is an array', (done) => {
      queries.createContact(testContact)
      .then(response => {
        expect(response).to.be.an('array')
        done()
      })
    })

    it('increments the id of the user', (done) => {
      queries.createContact(testContact)
      .then(response => {
        expect(response[0].id).to.equal(4)
        done()
      })
    })

    it('returns user', (done) => {
      queries.createContact(testContact)
      .then(response => {
        expect(response[0]).to.include({
          'id': 4,
          first_name: 'John',
          last_name: 'Hallman'
        })
        done()
      })
    })
  })
})
