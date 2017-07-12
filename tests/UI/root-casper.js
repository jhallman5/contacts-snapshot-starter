const url = 'http://localhost:3000/'

casper.test.begin('Test the page status', function(test) {
  casper.start(url, function() {
    test.assertHttpStatus(200, 'Page is up and running')
  })

  casper.then( function() {
    test.assert(casper.getCurrentUrl() === url, 'URL is the one expected')
  })

  casper.then( function() {
    test.assertTextExists('Jared', 'Jared is not yet deleted')
    test.assertTextExists('Tanner', 'Tanner is not yet deleted')
  })
  casper.thenEvaluate( function () {
    document.querySelector('.delete-contact').click('.delete-contact')
  })

  casper.then( function() {
    test.assertTextDoesntExist('Jared', 'Jared has been deleted')
    test.assertTextExists('Tanner', 'Tanner is not yet deleted')
  })

  casper.thenEvaluate( function () {
    document.querySelector('.delete-contact').click('.delete-contact')
  })

  casper.then( function() {
    test.assertTextDoesntExist('Jared', 'Jared is still deleted')
    test.assertTextDoesntExist('Tanner', 'Tanner is now deleted')
  })

  casper.run( function() {
    test.done()
  })
})
