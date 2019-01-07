var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlDashboard = require('../controllers/dashboard');
var ctrlForum = require('../controllers/forum');
var ctrlIdeas = require('../controllers/ideas');
var ctrlUser = require('../controllers/user');
var ctrlLogout = require('../controllers/logout');


// GET Pages
router.get('/', ctrlHome.index);
router.get('/forum', ctrlForum.mainList);
router.get('/dashboard', ctrlDashboard.ideaList);
router.get('/user', ctrlUser.main);
router.get('/logout', ctrlLogout.main);

router.get('/ideas/new', ctrlIdeas.postIdea);
router.get('/ideas/:ideaid', ctrlDashboard.viewIdea);
router.get('/ideas/:ideaid/del', ctrlIdeas.deleteIdea);
router.get('/ideas/:ideaid/edit', ctrlIdeas.editIdea);

router.get('/ideas/:ideaid/comments', ctrlIdeas.postComment);

router.get('/user/register', ctrlUser.registerUser);
router.get('/user/login', ctrlUser.loginUser);

module.exports = router;
