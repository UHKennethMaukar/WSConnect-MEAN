var mongoose = require('mongoose');
var Ideas = mongoose.model('Ideas');

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
};

module.exports.createIdeas = function (req,res) {
    sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.viewIdeas = function (req,res) {
    sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.ideasReadOne = function (req,res) {
    Ideas
        .findById(req.params.ideaid)
        .exec(function(err,idea) {
            sendJsonResponse(res, 200, idea);
        });
};

module.exports.ideasUpdateOne = function (req,res) {
    sendJsonResponse(res, 200, {"status" : "success"});
};
module.exports.ideasDeleteOne = function (req,res) {
    sendJsonResponse(res, 200, {"status" : "success"});
};
