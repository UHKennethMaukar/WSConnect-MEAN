/*
var mongoose = require('mongoose');
var Ideas = mongoose.model('Ideas');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.createComments = function (req,res) {
    var ideaid = req.params.ideaid;
    if (ideaid) {
        Ideas
            .findById(ideaid)
            .select('comments')
            .exec(
                function(err, idea) {
                    if (err) {
                        sendJsonResponse(res, 400, err);
                    } else {
                        doAddComment(req, res, idea);
                    }
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, ideaid required"
        });
    }
};

var doAddComment = function(req, res, idea) {
    if (!idea) {
        sendJsonResponse(res, 404, {
            "message": "ideaid not found"
        });
    } else {
        idea.comments.push({
            commentText: req.body.commentText,
            sentiment: req.body.sentiment,
        });
        idea.save(function(err, location) {
            var thisComment;
            if (err) {
                sendJsonResponse(res, 400, err);
            } else {
                thisComment = idea.comments[idea.comments.length - 1];
                sendJsonResponse(res, 201, thisComment);
            }
        });
    }
};

module.exports.commentsReadOne = function(req, res) {
    if (req.params && req.params.ideaid && req.params.commentid) {
        Ideas
            .findById(req.params.ideaid)
            .select('name comments')
            .exec(
                function(err, idea) {
                    var response, comment;
                    if (!idea) {
                        sendJsonResponse(res, 404, {
                            "message": "ideaid not found"
                        });
                        return;
                    } else if (err) {
                        sendJsonResponse(res, 400, err);
                        return;
                    }
                    if (idea.comments && idea.comments.length > 0) {
                        comment = idea.comments.id(req.params.commentid);
                        if (!comment) {
                            sendJsonResponse(res, 404, {
                                "message": "commentid not found"
                            });
                        } else {
                            response = {
                                idea : {
                                    title : idea.title,
                                    id : req.params.ideaid
                                },
                                comment : comment
                            };
                            sendJsonResponse(res, 200, response);
                        }
                    } else {
                        sendJsonResponse(res, 404, {
                            "message": "No comments found"
                        });
                    }
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, ideaid and commentid are both required"
        });
    }
};

module.exports.commentsUpdateOne = function(req, res) {
    if (!req.params.ideaid || !req.params.commentid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, ideaid and commentid are both required"
        });
        return;
    }
    Ideas
        .findById(req.params.ideaid)
        .select('comments')
        .exec(
            function(err, idea) {
                var thisComment;
                if (!idea) {
                    sendJsonResponse(res, 404, {
                        "message": "ideaid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                if (idea.reviews && idea.reviews.length > 0) {
                    thisComment = idea.comments.id(req.params.commentid);
                    if (!thisComment) {
                        sendJsonResponse(res, 404, {
                            "message": "commentid not found"
                        });
                    } else {
                        thisComment.commentText = req.body.commentText;
                        thisComment.sentiment = req.body.sentiment;
                        idea.save(function(err, idea) {
                            if (err) {
                                sendJsonResponse(res, 404, err);
                            } else {
                                sendJsonResponse(res, 200, thisComment);
                            }
                        });
                    }
                } else {
                    sendJsonResponse(res, 404, {
                        "message": "No comment to update"
                    });
                }
            }
        );
};

module.exports.commentsDeleteOne = function(req, res) {
    if (!req.params.ideaid || !req.params.ideaid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, ideaid and commentid are both required"
        });
        return;
    }
    Ideas
        .findById(req.params.ideaid)
        .select('comments')
        .exec(
            function(err, idea) {
                if (!idea) {
                    sendJsonResponse(res, 404, {
                        "message": "ideaid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                if (idea.comments && idea.comments.length > 0) {
                    if (!idea.comments.id(req.params.commentid)) {
                        sendJsonResponse(res, 404, {
                            "message": "commentid not found"
                        });
                    } else {
                        idea.comments.id(req.params.commentid).remove();
                        idea.save(function(err) {
                            if (err) {
                                sendJsonResponse(res, 404, err);
                            } else {
                                sendJsonResponse(res, 204, null);
                            }
                        });
                    }
                } else {
                    sendJsonResponse(res, 404, {
                        "message": "No comment to delete"
                    });
                }
            }
        );
};