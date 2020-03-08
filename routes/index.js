const router = require('express').Router();
const fs = require('fs');
const fetch = require('node-fetch');
const config = require('../config');
const request = require('request-promise-native');

router.get('/', async (req, res) => {
  const piku = await fs.readFileSync('./db/piku.json');
  const pikuJson = JSON.parse(piku.toString());

  res.render('index', {
    title: '보컬로이드 월드컵 얼리 액세스',
    piku: pikuJson
  });
});

router.get('/qurareforevermxforever', async function(req, res, next) {
  const piku = await fs.readFileSync('./db/piku.json');
  const pikuJson = JSON.parse(piku.toString());

  res.render('edit', {
    title: 'PIKU MANAGER',
    piku: pikuJson
  });
});

router.post('/refresh', async (req, res) => {
  const piku = await fs.readFileSync('./db/piku.json');
  const pikuJson = JSON.parse(piku.toString());

  res.redirect('/')
});

router.get('/db/:id', async (req, res) => {
  const piku = await fs.readFileSync('./db/piku.json');
  const pikuJson = JSON.parse(piku.toString());
  res.status(200).json(pikuJson[req.params.id])
});

module.exports = router;
