// Render Angular Page
module.exports.mainList = function(req, res){
      renderForumPage(req, res);
    };

var renderForumPage = function(req, res){
  res.render('forum-list', {
    title: 'The Forum',
    pageHeader: {
      title: 'WSConnect',
      strapline: 'Connecting Investors Worldwide'
    }
  });
};