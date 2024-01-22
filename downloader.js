const ytdl = require('ytdl-core');

async function ytDownloader(url, type) {
  try {
    const videoURL = url;
    if (!ytdl.validateURL(videoURL)) {
      return { status: 404, message: "Invalid video URL" };
    }

    const info = await ytdl.getInfo(videoURL);
    let videoFormat;

    if (type === "mp3") {
      videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
    } else if (type === "mp4") {
      videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highest' });
    } else {
      return { status: 400, message: "Invalid download type" };
    }

    const stream = ytdl(videoURL, { format: videoFormat });
    const fileName = `${encodeURIComponent(info.videoDetails.title)}.${type}`; 

    return { status: 200, stream, fileName };
  } catch (error) {
    return { status: 500, message: "Error, try again later" };
  }
}

module.exports = { ytDownloader };