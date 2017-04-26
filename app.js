
/**
 * Module dependencies.
 */
var prismic = require('prismic-nodejs');
var app = require('./config');
var configuration = require('./prismic-configuration');
var PORT = app.get('port');

// Returns a Promise
function api(req, res) {
  // So we can use this information in the views
  res.locals.ctx = {
    endpoint: configuration.apiEndpoint,
    linkResolver: configuration.linkResolver
  };
  return prismic.api(configuration.apiEndpoint, {
    accessToken: configuration.accessToken,
    req: req
  });
}

function handleError(err, req, res) {
  if (err.status == 404) {
    res.status(404).send("404 not found");
  } else {
    res.status(500).send("Error 500: " + err.message);
  }
}

app.listen(PORT, function() {
  console.log('Express server listening on port ' + PORT);
});

app.route('/sample').get(function(req, res) {
  res.render('sample');
});

app.route('/preview').get(function(req, res) {
  api(req, res).then(function(api) {
    return prismic.preview(api, configuration.linkResolver, req, res);
  }).catch(function(err) {
    handleError(err, req, res);
  });
});

app.route('/').get(function(req, res) {
  res.redirect('sample-page');
});

app.route('/spotlight/:uid').get(function(req, res) {
var uid = req.params.uid;
  api(req, res).then(function(api) {
    return api.getByUID('spotlight', uid).then(function(spotlight) {
    if (spotlight) {
      res.render('spotlight', {
        spotlight: spotlight
      });
    } else {
      res.status(404).send("Page not found");
    }
  }).catch(function(err) {
    handleError(err, req, res);
  });  });
});

app.route('/event/:uid').get(function(req, res) {
var uid = req.params.uid;
  api(req, res).then(function(api) {
    return api.getByUID('event', uid).then(function(event) {
    if (event) {
      res.render('event', {
        event: event
      });
    } else {
      res.status(404).send("Page not found");
    }
  }).catch(function(err) {
    handleError(err, req, res);
  });  });
});

app.route('/:uid').get(function(req, res) {
  var uid = req.params.uid;
  api(req, res).then(function(api) {
    return api.getByUID('page', uid, {
      fetchLinks: 'category.title'
    });
  }).then(function(page) {
    if (page) {
      res.render('page', {
        page: page
      });
    } else {
      res.status(404).send("Page not found");
    }
  }).catch(function(err) {
    handleError(err, req, res);
  });
});
