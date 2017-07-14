const url = 'http://localhost:3000/'

casper.test.begin('Root', function(test) {
  casper.start(url, function() {
    test.assertHttpStatus(200, 'Page is up and running')
    test.assert(casper.getCurrentUrl() === url, 'URL is /')
  })

  casper.thenEvaluate(function() {
    document.querySelector('.new-contact').click()
  })

  casper.then(function(){
    test.assert(casper.getCurrentUrl() === url + 'contacts/new', 'moves to New contact page')
  })

  casper.waitForSelector('.new-contact-form', function(){
    this.fill('.new-contact-form', {
      first_name: 'Steven-test',
      last_name: 'The Destroyer'
    }, true)
})
  casper.then(function(){
    test.assert(casper.getCurrentUrl() === 'http://localhost:3000/contacts/2', 'redirects to the new User page')
  })

  casper.then(function() {
    test.assertTextExists('The Destroyer', 'Steven-test is created')
  })

  // casper.then(function() {
  //   test.assertTextExists('The Destroyer', 'Steven-test is not yet deleted')
  // })

  // casper.thenEvaluate(function () {
  //   document.querySelector('.delete-contact').click()
  // })
  //
  // casper.setFilter('page.confirm', function(msg) {
  //   return msg === 'Are you sure you want to delete this contact?' ? true : false
  // })

  // casper.then(function() {
  //   test.assertTextDoesntExist('The Destroyer', 'Steven-test is deleted')
  // })
  //
  // casper.thenEvaluate(function() {
  //   document.querySelector('.contact-link').click()
  // })
  //
  // casper.then(function() {
  //   test.assert(casper.getCurrentUrl() === url + 'contacts/3', 'moves to NeEddra\'s page')
  // })
  //
  // casper.thenEvaluate( function() {
  //   document.querySelector('.delete-contact').click()
  // })
  //
  // casper.setFilter('page.confirm', function(msg) {
  //   return msg === 'Are you sure you want to delete this contact?' ? true : false
  // })
  //
  // casper.thenEvaluate(function() {
  //   document.querySelector('.new-contact').click()
  // })
  //
  // casper.then(function(){
  //   test.assert(casper.getCurrentUrl() === url + 'contacts/new', 'moves to New contact page')
  // })

  casper.run( function() {
    test.done()
  })
})
