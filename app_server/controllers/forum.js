/* Landing Page */
module.exports.mainList = function (req, res) {
    renderForumpage(req, res);
  };

var renderForumpage = function(req, res){
  res.render('forum-list', {
    title:'WSC - Connecting Investors Worldwide',
    pageheader: {
      title: 'WSC',
      strapline:'View global sentiments, share your investment ideas'
    },
    sidebar:"Collaborate with worldwide investors and analysts in sharing your outlook for equity markets and companies. Valuations move with overall sentiment; your voice matters too"
  });
};