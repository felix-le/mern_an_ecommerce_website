const router = require('express').Router();
const readCsvCrl = require('../controllers/readCsvCtrl');

router.post('/readCsv', readCsvCrl.postItemCsv);
module.exports = router;
