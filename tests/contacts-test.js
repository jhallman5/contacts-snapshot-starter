const chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
const { initializeTestDB } = require('./test-utilities')

chai.use(chaiHttp)

beforeEach( () =>
  initializeTestDB()
)

describe('Contacts', () => {
  context('/contacts/new', () => {
    it('response has status code 200/HTML', (done) => {
      chai.request('http://localhost:3000')
        .get('/contacts/new')
        .end( (error, res) => {
          expect(res).to.have.status(200)
          expect(res).to.be.html
          done()
        })
    })

    it('renders the new page', (done)  => {
      chai.request('http://localhost:3000')
        .get('/contacts/new')
        .end( (error, res) => {
          expect(res.text).to.contain('<h1>New Contact</h1>')
          done()
        })
    })
  })

  context('/contacts', () => {
    it('post route saves contact data to db with status code 200/HTML', (done) => {
      chai.request('http://localhost:3000')
        .post('/contacts')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          'first_name':'John',
          'last_name': 'Hallman'
        })
        .end( (error, res) => {
          expect(res).to.have.status(200)
          expect(res).to.be.html
          done()
        })
    })

    it('returns to the new contact page', (done) => {
      chai.request('http://localhost:3000')
        .post('/contacts')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          'first_name': 'John',
          'last_name': 'Hallman'
        })
        .end( (error, res) => {
          expect(res.text).contains('Hallman')
          done()
        })
      })
  })

  context('/contacts/:contactId', () => {
    it('response has status code 200/HTML', (done) => {
      chai.request('http://localhost:3000')
        .get('/contacts/2')
        .end( (error, res) => {
          expect(res).to.have.status(200)
          expect(res).to.be.html
          done()
        })
    })

    it('renders show page', (done) => {
      chai.request('http://localhost:3000')
        .get('/contacts/2')
        .end( (error, res) => {
          expect(res.text).contains('<div class="contact-show-page-controls">')
          done()
        })
    })

    it('renders with the correct information', (done) => {
      chai.request('http://localhost:3000')
        .get('/contacts/2')
        .end( (error, res) => {
          expect(res.text).contains('Welsh')
          expect(res.text).to.not.contain('Jared')
          expect(res.text).to.not.contain('James')
          done()
        })
    })
  })

  context('/contacts/:contactId/delete', () => {
    it('response has status code 200/HTML', (done) => {
      chai.request('http://localhost:3000')
        .get('/contacts/2/delete')
        .end( (error, res) => {
          expect(res).to.have.status(200)
          expect(res).to.be.html
          done()
        })
    })

    it('renders the contacts page', (done) => {
      chai.request('http://localhost:3000')
        .get('/contacts/2/delete')
        .end( (error, res) => {
          expect(res.text).contains('<div class="contact-list">')
          done()
        })
    })

    it('Deletes the user', (done) => {
      chai.request('http://localhost:3000')
        .get('/contacts/2/delete')
        .end( (error, res) => {
          expect(res.text).contains('Jared')
          expect(res.text).contains('James')
          expect(res.text).to.not.contain('Welsh')
          done()
        })
    })
  })

  context('/search', () => {
    it('renders the index page', (done) => {
      chai.request('http://localhost:3000')
        .get('/contacts/search?q=Jared')
        .end( (error, res) => {
          expect(res.text).contains('<div class="contact-list">')
          done()
        })
    })

    it('renders with only the searched name', (done) => {
      chai.request('http://localhost:3000')
        .get('/contacts/search?q=Jared')
        .end( (error, res) => {
          expect(res.text).contains('Jared')
          expect(res.text).to.not.contain('Welsh')
          expect(res.text).to.not.contain('James')
          done()
        })
    })

    it('renders with mutliple names if applicable', (done) => {
      chai.request('http://localhost:3000')
        .get('/contacts/search?q=ja')
        .end( (error, res) => {
          expect(res.text).contains('Jared')
          expect(res.text).contains('James')
          expect(res.text).to.not.contain('Welsh')
          done()
        })
      })
    })

})
