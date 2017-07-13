const url = 'http://localhost:3000/contacts/new'
//
casper.test.begin('Add User', function(test) {
  casper.start(url, function() {
    test.assertHttpStatus(200, 'Page is up and running')
    test.assert(casper.getCurrentUrl() === url, 'URL is /contacts/new')
  })
//
  casper.waitForSelector('.new-contact-form', function(){
    this.fill('.new-contact-form', {
      first_name: 'Steven-test',
      last_name: 'The Destroyer'
    }, true)
})
  casper.then(function(){
    test.assert(casper.getCurrentUrl() === 'http://localhost:3000/contacts/1', 'redirects to the new User page')
  })

  casper.run( function() {
    test.done()
  })
})
