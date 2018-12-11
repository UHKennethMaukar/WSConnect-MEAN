/* Landing Page */
module.exports.mainList = function (req, res) {
    res.render('ideas', { title: 'Your Ideas' });
  };

/* Post new Idea */
module.exports.postIdea = function (req, res) {
    res.render('newIdea', { title: 'Post new Idea' });
  };
  