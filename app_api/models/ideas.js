var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    commentCount: { type: Number, default: 0 },
    commentBody: { type: String, required: true},
    commentBy: { type: String },
    commentAt: { type: Date, default: Date.now() },
});

var ideaSchema = new mongoose.Schema ({
  title: { type: String, required: true},
  ticker: { type: String, required: true},
  sentiment: { type: String, required: true},
  body: { type: String, required: true},
  attachments: { type: Array }, // Array of documents that will be attached by the user. Will be further revised
  postedBy: { type: String }, 
  postedAt: { type: Date, default: Date.now() },
  upvoteCount: { type: Number, default: 0 },
  upvoteBy: { type: Array }, // Stores the array of usernames. Allows for referencing 
  downvoteCount: { type: Number, default: 0 },
  downvoteBy: { type: Array }, // Stores the array of usernames.
  comments: [commentSchema]
});

// mongoose.model('name of model', 'schema to use', 'MongoDB collection name [optional]');
mongoose.model('Ideas', ideaSchema, 'wscIdeas');

// Sample document
/* db.wscIdeas.save({
title: "Apple's Sales Performance Disappoints",
ticker: 'AAPL',
sentiment: 'Neutral',
body: "Underwhelming sales for core products iPhone XS/XR, but revenue growth from services on track with expectations. A full-blown trade war will likely threaten core business"
}) */