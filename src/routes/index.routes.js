const { Router } = require('express');
const router = Router();

const {renderIndex, renderAbout} = require('../controllers/index.controller');

// Landing page --> GET /
router.get('/', renderIndex );
// About --> GET /about
router.get('/about', renderAbout );

module.exports = router;