const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./api');

router.use(bodyParser.json());
router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, DELETE');
  next();
});

router.get('/peoples', api.listAll);
router.get('/peoples/random', api.getRandom);
router.get('/peoples/:id', api.get);
router.get('/peoples/name/:name', api.filterByName);
router.get('/peoples/skill/:skill', api.filterBySkill);
router.post('/peoples', api.create);
router.put('/peoples/:id', api.update);
router.delete('/peoples/:id', api.delete);

module.exports = router;
