const chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
const contacts = require('../server/routes/contacts')

chai.use(chaiHttp)

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
})
