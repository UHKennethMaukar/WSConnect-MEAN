/* GET home page. */
module.exports.index = function (req, res) {
    res.render('home', { title: 'Home' });
  };

/* GET market data NOT IMPLEMENTED */
module.exports.widget = function (req, res) {
    res.render('marketPrice', { title: 'Markets' });
  };

/* GET trending statistics */
module.exports.trendingNow = function (req, res) {
    res.render('trendingNow', { title: 'Trending Now'});
  };

/* GET top 5 most recent posts */
module.exports.recentIdeas = function (req, res) {
    res.render('recentIdeas', { title: 'Most Recent Ideas' })
  };

