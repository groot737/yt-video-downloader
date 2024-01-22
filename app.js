const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const {ytDownloader} = require('./downloader')
const port = 3000;

app.set('view engine', 'ejs')
app.use(express.static('./views'))
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render("index")
});

app.post('/download', async (req, res) => {
    const {url, type} = req.body
  
    const result = await ytDownloader(url, type);
  
    if (result.status === 200) {
      res.header('Content-Disposition', `attachment; filename="${result.fileName}"`);
      result.stream.pipe(res)
    } else {
      res.status(result.status).send(result.message);
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
