var express = require('express');
var router = express.Router();
var ctrlIdeas = require('../controllers/ideas');
var ctrlAuth = require('../controllers/userAuthentication');

// Authentication
router.get('/',ctrlAuth.index);
router.post('/register',ctrlAuth.register);
router.post('/login',ctrlAuth.login);

// Ideas
router.get('/ideas', ctrlIdeas.viewIdeas);
router.post('/ideas', ctrlIdeas.createIdeas);
router.get('/ideas/:ideaid', ctrlIdeas.ideasReadOne);
router.put('/ideas/:ideaid', ctrlIdeas.ideasUpdateOne);
router.delete('/ideas/:ideaid', ctrlIdeas.ideasDeleteOne);

module.exports = router;