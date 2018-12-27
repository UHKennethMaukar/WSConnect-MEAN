var mongoose = require('mongoose');
var Ideas = mongoose.model('Ideas');

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
};

module.exports.createIdeas = function (req,res) {
    Ideas.create({
        title: req.body.title,
        ticker: req.body.ticker,
        sentiment: req.body.sentiment,
        text: req.body.text,
    }, function(err, idea) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, idea);
        }
    });
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

module.exports.viewIdeas = function (req,res) {
    Ideas
        .find()
        .exec(function(err, idea) {
            if (!idea) {
                sendJsonResponse(res, 404, {
                    message: "No ideas found"
                });
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, idea);
        });
    };
    

module.exports.ideasReadOne = function (req,res) {
    if (req.params && req.params.ideaid) {
        Ideas
            .findById(req.params.ideaid)
            .exec(function(err, idea) {
                if (!idea) {
                    sendJsonResponse(res, 404, {
                        "message": "Idea not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, idea);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No ideaid in request"
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


module.exports.ideasUpdateOne = function (req,res) {
    if (!req.params.ideaid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, ideaid is required"
        });
        return;
    }
    Ideas
        .findById(req.params.ideaid)
        .select('-reviews -rating')
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
                idea.title = req.body.title;
                idea.ticker = req.body.ticker;
                idea.sentiment = req.body.sentiment;
                idea.text = req.body.text;
                idea.save(function(err, idea) {
                if (err) {
                    sendJsonResponse(res, 404, err);
                } else {
                    sendJsonResponse(res, 200, idea);
                }
            });
        }
    );
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

module.exports.ideasDeleteOne = function (req,res) {
    var ideaid = req.params.ideaid;
    if (ideaid) {
        Ideas
            .findByIdAndRemove(ideaid)
            .exec(
                function(err, idea) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 204, null);
                }
            );
    }   else {
        sendJsonResponse(res, 404, {
            "message": "No ideaid"
        });
    }
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