/* Landing Page */
module.exports.main = function (req, res) {
    res.render('index', { title: 'Dashboard' });
  };