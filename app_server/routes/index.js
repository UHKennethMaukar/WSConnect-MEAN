var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlDashboard = require('../controllers/dashboard');
var ctrlForum = require('../controllers/forum');
var ctrlIdeas = require('../controllers/ideas');
var ctrlUser = require('../controllers/user');
var ctrlAbout = require('../controllers/about');


/* GET Pages */
router.get('/', ctrlHome.index);
router.get('/dashboard', ctrlDashboard.main);
router.get('/forum', ctrlForum.mainList);
router.get('/ideas', ctrlIdeas.ideaList);
router.get('/ideas/new', ctrlIdeas.postIdea);
router.post('/ideas/new', ctrlIdeas.doPostIdea);
router.get('/user', ctrlUser.main);
router.get('/user/register', ctrlUser.registerUser);
router.get('/user/login', ctrlUser.loginUser);
router.get('/about', ctrlAbout.main);

module.exports = router;
