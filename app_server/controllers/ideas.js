var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
/* 
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "_INSERTLINKHERE_";
}
*/

// Post New Idea
module.exports.postIdea = function(req, res){
  renderIdeaForm(req, res);
};

var renderIdeaForm = function (req, res) {
  res.render('idea-new', {
    title: 'Post new Idea',
    error: req.query.err
  });
};

// Delete Idea
module.exports.deleteIdea = function(req, res){
  var requestOptions, path;
  path = "/api/ideas/" + req.params.ideaid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "DELETE",
    json: {},
  };
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      renderDeleteForm(req, res, data);
    }
  );
};

var renderDeleteForm = function (req, res) {
  res.render('idea-del', {
    title: 'Delete Idea',
    error: req.query.err
  });
};

//Edit Idea
module.exports.editIdea = function(req, res){
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
      renderEditForm(req, res, data);
    }
  );
};

var renderEditForm = function (req, res, responseBody) {
  res.render('idea-edit', {
    title: 'Edit Idea',
    pageHeader: {
      title: 'WSConnect',
      strapline: 'Connecting Investors Worldwide'
    },
    idea: responseBody
  });
};

module.exports.postComment = function(req, res){
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
      renderViewComments(req, res, data);
    }
  );
};

var renderViewComments = function (req, res, responseBody) {
  res.render('idea-comment', {
    title: 'Viewing Idea',
    pageHeader: {
      title: 'WSConnect',
      strapline: 'Connecting Investors Worldwide'
    },
    idea: responseBody
  });
};