var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};

/* Landing Page */
module.exports.main = function (req, res) {
    res.render('index', { title: 'Welcome User' });
  };

/* Register */
module.exports.registerUser = function (req, res) {
    res.render('register', { title: 'Register' });
  };

/* Login */
module.exports.loginUser = function(req, res){

  res.render('login', {
    title: 'Please Login',
    pageHeader: {
      title: 'WSConnect',
      strapline: 'Connecting Investors Worldwide'
    },
  });

  // var requestOptions, path;
  // path = '/user/login';
  // requestOptions = {
  //   url: apiOptions.server + path,
  //   method: "POST",
  //   json: {},
  // };

  // request(
  //   requestOptions,
  //   function(err, response, body) {
  //     renderLoginpage(req, res, body);
  //   }
  // );
};

var renderLoginpage = function(req, res){
  res.render('login', {
    title: 'Please Login',
    pageHeader: {
      title: 'WSConnect',
      strapline: 'Connecting Investors Worldwide'
    },
  });
};
  