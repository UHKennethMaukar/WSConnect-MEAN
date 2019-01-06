var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    commentText: { type: String, required: true},
    vote: { type: Number, required: true, min: -1, max: 1},
    commentBy: { type: String },
    commentAt: { type: Date, default: Date.now() },
});

var ideaSchema = new mongoose.Schema ({
  title: { type: String, required: true},
  ticker: { type: String, required: true},
  sentiment: { type: String, required: true},
  text: { type: String, required: true},
  attachments: { type: Array }, // Array of documents that will be attached by the user. Will be further revised
  postedBy: { type: String }, 
  postedAt: { type: Date, default: Date.now() },
  voteCount: { type: Number, default: 0 },
  comments: [commentSchema]
});

// mongoose.model('name of model', 'schema to use', 'MongoDB collection name [optional]');
mongoose.model('Ideas', ideaSchema, 'wscIdeas');

// Sample document
/* 
db.wscIdeas.save({
  title: 'Attractive Valuation Post-Correction',
  ticker: 'AAPL',
  sentiment: 'Bullish',
  text: 'In the aftermath of a major correction in the major indexes, tech stocks have been rattled by negative sentiment. A lacklustre quarter for Apple further subjected it to the wrath of a major selloff. As the dust begins to settle, I see a very good opportunity to once again invest in Apple, which should rebound swiftly given its robust product line, innovation, and gradual shift in focus towards its services segment with higher retention rates and commendable gross margins.',
  postedBy: 'Jdoe1',
  postedAt: '1 Jan 2019',
  voteCount: '9',
})
*/