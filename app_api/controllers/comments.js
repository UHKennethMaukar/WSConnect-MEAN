var mongoose = require('mongoose');
var Ideas = mongoose.model('Ideas');

module.exports.commentsCreate = function(req, res) {
    if (req.params.ideaid) {
      Ideas
        .findById(req.params.ideaid)
        .select('comments')
        .exec(
          function(err, idea) {
            if (err) {
              sendJSONresponse(res, 400, err);
            } else {
              doAddReview(req, res, idea);
            }
          }
      );
    } else {
      sendJSONresponse(res, 404, {
        "message": "Not found, ideaid required"
      });
    }
  };
  
  
  var doAddComment = function(req, res, idea) {
    if (!idea) {
      sendJSONresponse(res, 404, "ideaid not found");
    } else {
      idea.comments.push({
        commentText: req.body.commentText
      });
      idea.save(function(err, idea) {
        var thisComment;
        if (err) {
          sendJSONresponse(res, 400, err);
        } else {
          thisComment = idea.comments[idea.comments.length - 1];
          sendJSONresponse(res, 201, thisComment);
        }
      });
    }
  };