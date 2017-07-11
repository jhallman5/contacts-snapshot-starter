const chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
const contacts = require('../server/routes/contacts')
const { initializeTestDB } = require('./test-utilities')

chai.use(chaiHttp)

beforeEach( () =>
  initializeTestDB()
)

describe('Contacts', () => {
  context('/', () => {
    it('response has status code 200', (done) => {
      chai.request('http://localhost:3000')
        .get('/')
        .end( (error, res) => {
          expect(res).to.have.status(200)
          done()
        })
    })

    it('response has html', (done) => {
      chai.request('http://localhost:3000')
        .get('/')
        .end( (error, res) => {
          expect(res).to.be.html
          done()
        })
    })

    it('renders the correct page', (done)  => {
      chai.request('http://localhost:3000')
        .get('/')
        .end( (error, res) => {
          expect(res.text).contains('<h1>Contacts</h1>')
          done()
        })
    })

    it('response has all contacts', (done) => {
      chai.request('http://localhost:3000')
        .get('/')
        .end( (error, res) => {

          expect(res.text).contains('Jared')
          expect(res.text).contains('NeEddra')
          expect(res.text).contains('Tanner')
          done()
        })
    })
  })

  context('/contacts/new', () => {
    it('renders status code 200', (done)  => {
      chai.request('http://localhost:3000')
        .get('/new')
        .end( (error, res) => {
          expect(res).to.have.status(200)
          done()
        })
    })

    it('renders HTML', (done)  => {
      chai.request('http://localhost:3000')
        .get('/new')
        .end( (error, res) => {
          expect(res).to.be.html
          done()
        })
    })

    it('renders the correct page', (done)  => {
      chai.request('http://localhost:3000')
        .get('/contacts/new')
        .end( (error, res) => {
          expect(res.text).to.contain('<h1>New Contact</h1>')
          done()
        })
    })

    it('post route saves contact data to db with status code 200', (done) => {
      chai.request('http://localhost:3000')
        .post('/contacts')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          'first_name':'John',
          'last_name': 'Hallman'
        })
        .end( (error, res) => {
          expect(res).to.have.status(200)
          done()
        })
    })
  })

  context('contacts/:contactId', () => {
    it('GET /contacts/:contactId gets the correct data', (done) => {
      chai.request('http://localhost:3000')
        .get('/contacts/2')
        .end( (error, res) => {
          console.log( "=-=-=-> res ID", res.text )
          expect(res.text).contains('Welsh')
          expect(res.text).to.not.contain('Jared')
          expect(res.text).to.not.contain('James')
          done()
        })
    })
  })
  //
  // context('contacts/:contactId/delete', () => {
  //   it('GET route makes sure the correct data is deleted', (done) => {
  //     chai.request('http://localhost:3000')
  //       .get('/contacts/2/delete')
  //       .end( (error, res) => {
  //         console.log( "=-=-=-> res DELETE", res.text )
  //         expect(res.text).contains('Welsh')
  //         expect(res.text).to.not.contain('Jared')
  //         expect(res.text).to.not.contain('James')
  //         done()
  //       })
  //   })
  // })
})
