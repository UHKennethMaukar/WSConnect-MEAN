var express = require('express');
var router = express.Router();
var ctrlIdeas = require('../controllers/ideas');
//var ctrlComments = require('../controllers/comments');
var ctrlAuth = require('../controllers/userAuthentication');

// Authentication
router.get('/',ctrlAuth.index);
router.post('/user/register',ctrlAuth.register);
router.post('/user/login',ctrlAuth.login);

// Ideas
router.get('/ideas', ctrlIdeas.viewIdeas);
router.post('/ideas/new', ctrlIdeas.createIdeas);
router.get('/ideas/:ideaid', ctrlIdeas.ideasReadOne);
router.put('/ideas/:ideaid', ctrlIdeas.ideasUpdateOne);
router.delete('/ideas/:ideaid', ctrlIdeas.ideasDeleteOne);

// Comments
router.post('/ideas/:ideaid/comments', ctrlIdeas.commentsCreate);

/* 
//Comments
router.post('/ideas/:ideaid/comments', ctrlComments.commentsCreate);
router.get('/ideas/:ideaid/comments/:commentid', ctrlComments.commentsReadOne);
router.put('/ideas/:ideaid/comments/:commentid', ctrlComments.commentsUpdateOne);
router.delete('/ideas/:ideaid/comments/:commentid', ctrlComments.commentsDeleteOne);
*/

module.exports = router;