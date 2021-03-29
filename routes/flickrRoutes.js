const express = require('express');
const validate = require('express-validation');

const controller = require('../controllers/flickrController');
const validations = require('../validations/flickrValidation');

const router = express.Router();

router
  .route('/')
  .get(validate(validations.list), controller.list);

router.get('/status', (req, res) => res.json({ status: 'OK' }));
router.use('/docs', express.static('docs'));

module.exports = router;