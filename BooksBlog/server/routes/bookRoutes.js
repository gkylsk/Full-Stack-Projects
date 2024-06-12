const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

/**
 * App Routes
 */
router.get('/',bookController.homepage);
router.get('/categories',bookController.exploreCategories);
router.get('/categories/:id',bookController.exploreCategoriesById);
router.get('/collections/:id',bookController.exploreCollections);

// post search page
router.post('/search',bookController.searchBook);

// explore-latest
router.get('/explore-latest',bookController.exploreLatest);

// show-random
router.get('/explore-random',bookController.exploreRandom);

// submit book reviews
router.get('/submit-book',bookController.submitBook);

// post data
router.post('/submit-book',bookController.submitBookOnPost);
module.exports = router; // export the router

// about
router.get('/about',bookController.exploreAbout);