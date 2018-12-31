var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
/* 
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "_INSERTLINKHERE_";
}
*/

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
  path = "api/ideas/new"
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
            res.redirect('/dashboard');
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