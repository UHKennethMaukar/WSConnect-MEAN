var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlDashboard = require('../controllers/dashboard');
var ctrlForum = require('../controllers/forum');
var ctrlIdeas = require('../controllers/ideas');
var ctrlUser = require('../controllers/user');
var ctrlAbout = require('../controllers/about');


// GET Pages
router.get('/', ctrlHome.index);
router.get('/forum', ctrlForum.mainList);
router.get('/dashboard', ctrlDashboard.ideaList);
router.get('/user', ctrlUser.main);
router.get('/about', ctrlAbout.main);

router.get('/ideas/new', ctrlIdeas.postIdea);
router.get('/ideas/:ideaid', ctrlDashboard.viewIdea);
router.get('/ideas/:ideaid/del', ctrlIdeas.deleteIdea);
router.get('/ideas/:ideaid/edit', ctrlIdeas.editIdea);

router.get('/user/register', ctrlUser.registerUser);
router.get('/user/login', ctrlUser.loginUser);

module.exports = router;
