/* Landing Page */
module.exports.mainList = function (req, res) {
    res.render('ideas', { title: 'Your Ideas' });
  };
  ideas= [{
    title: "Outlook for Apple Questionable",
    ticker: "AAPL",
    sentiment: "Neutral",
    body: "Apple not to provide sales figure, revenue guidance cut & major assemblies slashing productions. Growth prospects not favourable" 
  }];

/* Post new Idea */
module.exports.postIdea = function (req, res) {
    res.render('newIdea', { title: 'Post new Idea' });
  };
  