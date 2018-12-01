/* Landing Page */
module.exports.mainList = function (req, res) {
    res.render('index', { title: 'Your Ideas' });
  };

/* Post new Idea */
module.exports.postIdea = function (req, res) {
    res.render('index', { title: 'Post new Idea' });
  };
  