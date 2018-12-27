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

module.exports.mainList = function(req, res){
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
      renderMainpage(req, res);
    }
  );
};

var renderMainpage = function(req, res, responseBody){
  res.render('ideas', { title: 'Your Ideas' });
};

/* Post new Idea */
module.exports.postIdea = function (req, res) {
  res.render('newIdea', { title: 'Post new Idea' });
  };