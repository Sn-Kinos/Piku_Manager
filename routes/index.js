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

  for (let key in pikuJson) {
    // if (!pikuJson[key]) {
      // const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${config.YT_API_KEY}&id=${key}`);
      // const json = await response.json();
      // pikuJson[key].title = json.items[0].snippet.title;
      // await fs.writeFileSync('./db/piku.json', JSON.stringify(pikuJson));
    // }
    if (!pikuJson[key].added) {
      // const add = await fetch(`http://www.piku.co.kr/w/make/video_upload.php`, {
      //   method: 'POST',
      //   body: {
      //     u: config.PIKU_ID,
      //     v: `https://www.youtube.com/watch?v=${key}`,
      //     vs: 0,
      //     ve: 0,
      //   },
      //   headers: {
      //     cookie: 'PHPSESSID=4hcqt01pedtui54t5224kcfj52'
      //   },
      // });
      //
      // const json = await add.text();
      // console.log(json)
      // const add = await request.post({
      //   uri: `http://www.piku.co.kr/w/make/video_upload.php`,
      //   method: 'post',
      //   form: {
      //     u: config.PIKU_ID,
      //     v: `https://www.youtube.com/watch?v=${key}`,
      //     vs: 0,
      //     ve: 0,
      //   },
      //   headers: {
      //     cookie: config.PHPSESSID,
      //   },
      // });
      console.log(add)
    }

    console.log(pikuJson[key])
  }
  res.redirect('/')
});

router.get('/:id', async (req, res) => {
  const piku = await fs.readFileSync('./db/piku.json');
  const pikuJson = JSON.parse(piku.toString());
  res.status(200).json(pikuJson[req.params.id])
});

module.exports = router;
