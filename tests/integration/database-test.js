const { expect } = require('chai')
const { initializeTestDB, truncateTable } = require('../test-utilities')
const queries = require('../../database')

beforeEach( () =>
  initializeTestDB()
)

after( () =>
  truncateTable()
)

describe('Database Integration', () => {
  context('createContact', () => {
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

  context( 'getContacts', () => {
    it('returns all contacts', (done) => {
      queries.getContacts()
        .then(response => {
          expect(response).to.be.an('array')
          expect(response).to.have.lengthOf(3)
          expect(response[0].last_name).to.be.equal('Grippe')
          expect(response[2].last_name).to.be.equal('James')
          done()
        })
    })
  })

  context('getContact', () => {
    it('returns a single contact', (done) => {
      queries.getContact(2)
        .then(response => {
          expect(response).to.be.an('object')
          expect(response.first_name).to.be.equal('Tanner')
          done()
        })
    })
  })

  // context('deleteContact', () => {
  //   it('deletes the contact from the database', (done) => {
  //     queries.deleteContact(2)
  //       .then(response => {
  //         console.log( "=-=-=-> response", response )
  //         done()
  //       })
  //   })
  // })

  context('searchForContact', () => {
    it('returns results from the search', (done) => {
      queries.searchForContact('Jared')
      .then( response => {
        expect(response).to.be.an('array')
        expect(response[0]).to.be.an('object')
        expect(response[0].last_name).to.be.equal('Grippe')
        done()
      })
    })

    it('returns multiple results', (done) => {
      queries.searchForContact('Ja')
      .then( response => {
        expect(response[0].last_name).to.be.equal('Grippe')
        expect(response[1].last_name).to.be.equal('James')
        done()
      })
    })

    // it('throws an error when not given a string', (done) => {
    //
    //     expect(queries.searchForContact()).to.throw(Error)
    //
    //   done()
    // })
  })
})
