var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
/*
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "_INSERTLINKHERE_";
}
*/

/* Landing Page */
/*
module.exports.testmainList = function (req, res) {
    res.render('ideas', { title: 'Your Ideas' });
  };
  ideas= [{
    title: "Outlook for Apple Questionable",
    ticker: "AAPL",
    sentiment: "Neutral",
    text: "Apple not to provide sales figure, revenue guidance cut & major assemblies slashing productions. Growth prospects not favourable" 
  }];
*/

var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Looks like the page does not exist.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Oops! There seems to be a problem around here.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};

module.exports.ideaList = function(req, res){
  var requestOptions, path;
  path = '/api/ideas';
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
  };
  request(
    requestOptions,
    function(err, response, body) {
      renderIdeapage(req, res, body);
    }
  );
};

var renderIdeapage = function(req, res, responseBody){
  var message;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "You have not posted any ideas yet"
    }
  }
  res.render('ideas-list', {
    title: 'Your Ideas',
    pageHeader: {
      title: 'WSConnect',
      strapline: 'Connecting Investors Worldwide'
    },
    ideas: responseBody,
    message: message
  });
};

/* Post new Idea */
var renderIdeaForm = function (req, res) {
  res.render('newIdea', {
    title: 'Post new Idea',
    error: req.query.err
  });
};

module.exports.postIdea = function(req, res){
    renderIdeaForm(req, res);
};

module.exports.doPostIdea = function (req, res) {
  var requestOptions, path, postdata;
  path = "/api/ideas"
  postdata = {
    title: req.body.title,
    ticker: req.body.ticker,
    sentiment: req.body.sentiment,
    text: req.body.text,
  };
    requestOptions = {
      url : apiOptions.server + path,
      method: "POST",
      json : postdata
    };
    if (!postdata.ticker || !postdata.title || !postdata.sentiment || !postdata.text) {
      res.redirect('/ideas/new?err=val');
    } else {
      request(
        requestOptions,
        function(err, response, body){
          if (response.statusCode === 201) {
            res.redirect('/ideas');
          } else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
            res.redirect('/ideas/new?err=val');
          } else {
            console.log(body);
            _showError(req, res, response.statusCode);
          }
        }
      );
    }
  };