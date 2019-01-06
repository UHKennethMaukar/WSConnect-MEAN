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
        postedBy: req.body.postedBy,
    }, function(err, idea) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            res.redirect('/dashboard');
        }
    });
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

module.exports.ideasUpdateOne = function (req,res) {
    if (!req.params.ideaid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, ideaid is required"
        });
        return;
    }
    Ideas
        .findById(req.params.ideaid)
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
                    res.redirect('/dashboard');
                }
            });
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

module.exports.commentsCreate = function(req, res) {
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
            vote: req.body.vote,
            commentText: req.body.commentText,
            commentBy: req.body.commentBy,
        });
        idea.save(function(err, idea) {
            var thisComment;
            if (err) {
                sendJsonResponse(res, 400, err);
            } else {
                updateVoteCount(idea._id);
                thisComment = idea.comments[idea.comments.length - 1];
                res.redirect('/forum');
            }
        });
    }
};

var updateVoteCount = function(ideaid) {
    Ideas
        .findById(ideaid)
        .select('vote comments')
        .exec(
            function(err, idea) {
                if(!err) {
                    doSetVoteCount(idea);
                }
            });
};

var doSetVoteCount =  function(idea) {
    var i, commentCount, voteTotal;
    if (idea.comments && idea.comments.length > 0) {
        commentCount = idea.comments.length;
        voteTotal = 0;
        for (i = 0; i < commentCount; i++) {
            voteTotal = voteTotal + idea.comments[i].vote;
        }
        idea.voteCount = voteTotal;
        idea.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Vote count updated to", voteTotal);
            }
        });
    }
};