var express = require('express');
var router = express.Router();
var ctrlIdeas = require('../controllers/ideas');

// ideas
router.get('/ideas', ctrlIdeas.viewIdeas);
router.post('/ideas', ctrlIdeas.createIdeas);
router.get('/ideas/:ideaid', ctrlIdeas.ideasReadOne);
router.put('/ideas/:ideaid', ctrlIdeas.ideasUpdateOne);
router.delete('/ideas/:ideaid', ctrlIdeas.ideasDeleteOne);

module.exports = router;