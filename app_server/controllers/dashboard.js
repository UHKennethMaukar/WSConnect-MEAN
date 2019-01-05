var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
/*
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "_INSERTLINKHERE_";
}
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
  res.render('dashboard', {
    title: 'Your Ideas',
    pageHeader: {
      title: 'WSConnect',
      strapline: 'Connecting Investors Worldwide'
    },
    ideas: responseBody,
    message: message
  });
};

module.exports.viewIdea = function(req, res){
  var requestOptions, path;
  path = "/api/ideas/" + req.params.ideaid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
  };
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      renderViewIdeaPage(req, res, data);
    }
  );
};

var renderViewIdeaPage = function(req, res, ideaDetail){
  res.render('idea-Info', {
    title: ideaDetail.title,
    pageHeader: {
      title: 'WSConnect',
      strapline: 'Connecting Investors Worldwide'
    },
    idea: ideaDetail
  });
};