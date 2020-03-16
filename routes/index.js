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

router.post('/overwrite', async (req, res) => {
  const piku = await fs.readFileSync('./db/piku.json');
  const pikuJson = JSON.parse(piku.toString());

  for (let i in pikuJson) {
    const changeTitle = await request.post({
      uri: "https://www.piku.co.kr/w/make/img_chg.php",
      body: `uid=${config.PIKU_ID}&dno=${i}&iname=${pikuJson[i].title}`,
      headers: {
        cookie: config.PHPSESSID,
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/82.0.4056.0 Safari/537.36 Edg/82.0.432.3',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
    console.log(changeTitle)
    await request.post({
      uri: 'https://www.piku.co.kr/w/make/video_upload.php',
      method: 'post',
      form: {
        u: config.PIKU_ID,
        v: `https://www.youtube.com/watch?v=${pikuJson[i].url}`,
        vs: pikuJson[i].start || 0,
        ve: pikuJson[i].end || 0,
        ino: i,
      },
      headers: {
        cookie: config.PHPSESSID,
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/82.0.4056.0 Safari/537.36 Edg/82.0.432.3',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    })
    console.log(pikuJson[i], i)
  }

  res.redirect('/')
});

router.get('/db/:id', async (req, res) => {
  const piku = await fs.readFileSync('./db/piku.json');
  const pikuJson = JSON.parse(piku.toString());
  res.status(200).json(pikuJson[req.params.id])
});

module.exports = router;
