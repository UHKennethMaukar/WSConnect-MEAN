/* Landing Page */
module.exports.main = function (req, res) {
    res.render('index', { title: 'Welcome User' });
  };

/* Register */
module.exports.registerUser = function (req, res) {
    res.render('index', { title: 'Register' });
  };

/* Login */
module.exports.loginUser = function (req, res) {
    res.render('index', { title: 'Login' });
  };
  