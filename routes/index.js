const router = require('express').Router();
const fs = require('fs');
const fetch = require('node-fetch');
const config = require('../config');
const request = require('request-promise-native');

router.get('/', async function(req, res, next) {
  const piku = await fs.readFileSync('./db/piku.json');
  const pikuJson = JSON.parse(piku.toString());

  res.render('index', {
    title: 'PIKU MANAGER',
    piku: pikuJson
  });
});

router.post('/refresh', async (req, res) => {
  const piku = await fs.readFileSync('./db/piku.json');
  const pikuJson = JSON.parse(piku.toString());

  res.redirect('/')
});

router.get('/:id', async (req, res) => {
  const piku = await fs.readFileSync('./db/piku.json');
  const pikuJson = JSON.parse(piku.toString());
  res.status(200).json(pikuJson[req.params.id])
});

module.exports = router;
