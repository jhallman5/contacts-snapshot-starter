const chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
const {app} = require('../../server')
const { initializeTestDB, truncateTable } = require('../test-utilities')

chai.use(chaiHttp)

beforeEach( () =>
  initializeTestDB()
)

after( () =>
  truncateTable()
)

describe('Root Routes End-to-End', () =>  {
  context('Basic routes', () => {
    it('response has status code 200/HTML', (done) => {
      chai.request(app)
        .get('/')
        .end( (error, res) => {
          expect(res).to.have.status(200)
          expect(res).to.be.html
          done()
        })
    })

    it('renders the correct page', (done)  => {
      chai.request(app)
        .get('/')
        .end( (error, res) => {
          expect(res.text).contains('<div class="contact-list">')
          done()
        })
    })

    it('response has all contacts', (done) => {
      chai.request(app)
        .get('/')
        .end( (error, res) => {
          expect(res.text).contains('Jared')
          expect(res.text).contains('NeEddra')
          // expect(res.text).contains('Tanner')
          done()
        })
    })
  })

  context('404 errors', () => {
    it('response has status code 200/HTML', (done) => {
    chai.request(app)
      .get('/fake')
      .end( (error, res) => {
        expect(res).to.have.status(200)
        expect(res).to.be.html
        done()
      })
    })

    it('renders the not_found page', (done) => {
    chai.request(app)
      .get('/fake')
      .end( (error, res) => {
        expect(res.text).contains('<h1>Page Not Found</h1>')
        done()
      })
    })
  })
})
