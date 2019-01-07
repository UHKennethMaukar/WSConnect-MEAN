/* Landing Page */
module.exports.main = function (req, res) {
    res.redirect('/');
    resetOnce();
  };

  function resetOnce() { 
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }