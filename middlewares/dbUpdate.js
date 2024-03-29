const fs = require('fs');

function youtube_parser(url) {
    const regExp = /^.*(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|&vi?=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : false;
}

module.exports = async (req, res, next) => {
    const piku = await fs.readFileSync('./db/piku.json');
    const pikuJson = JSON.parse(piku.toString());

    if (req.body.title) {
        pikuJson[req.params.id].title = req.body.title
    }
    else {
        pikuJson[req.params.id].url = youtube_parser(req.body.url);
        pikuJson[req.params.id].start = req.body.start;
        pikuJson[req.params.id].end = req.body.end;
    }

    await fs.writeFileSync('./db/piku.json', JSON.stringify(pikuJson, null, '  '));
    await res.status(200).json({title: pikuJson[req.params.id].title});
};
