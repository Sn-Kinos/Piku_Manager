const router =  require('express').Router();
const request = require('request-promise-native');
const config = require('../config');
const dbUpdate = require('../middlewares/dbUpdate');

/* GET users listing. */
router.patch('/title/:id', async (req, res, next) => {
  const changeName = await request.post({
    uri: "https://www.piku.co.kr/w/make/img_chg.php",
    body: `uid=${config.PIKU_ID}&dno=${req.body.no}&iname=${req.body.title}`,
    headers: {
      cookie: config.PHPSESSID,
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/82.0.4056.0 Safari/537.36 Edg/82.0.432.3',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  });
}, dbUpdate);

router.patch('/video/:id', async (req, res, next) => {
  const changeVid = await request.post({
    uri: "https://www.piku.co.kr/w/make/video_upload.php",
    method: 'post',
    form: {
      u: config.PIKU_ID,
      v: req.body.url,
      vs: req.body.start || 0,
      ve: req.body.end || 0,
      ino: req.body.no
    },
    headers: {
      cookie: config.PHPSESSID,
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/82.0.4056.0 Safari/537.36 Edg/82.0.432.3',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
  });
}, dbUpdate);

module.exports = router;
