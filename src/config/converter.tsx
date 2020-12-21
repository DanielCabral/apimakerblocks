var fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);


// open input stream
var infs = new ffmpeg

export default getName = () =>{
console.log('DAWD')
}


declare module "videoConverter" {
this.converterVideo = function(){
infs.addInput('./video.mp4').outputOptions([
    '-profile:v baseline',
    '-level 3.0',
    '-start_number 0',
    '-hls_time 20',
]).output('./output/video.m3u8')
    .on('start', function (commandLine) {
        console.log('Spawned Ffmpeg with command: ' + commandLine);
    })
    .on('error', function (err, stdout, stderr) {
        console.log('An error occurred: ' + err.message, err, stderr);
    })
    .on('progress', function (progress) {
        console.log('Processing: ' + progress.percent + '% done')
    })
    .on('end', function (err, stdout, stderr) {
        console.log('Finished processing!' , err, stdout, stderr)
    })
    .run()
  }
  //module.exports = converterVideo;

this.gerarThumbnails = function() {
    var proc = ffmpeg('./video.mp4')
  // setup event handlers
  .on('filenames', function(filenames) {
    console.log('screenshots are ' + filenames.join(', '));
  })
  .on('end', function() {
    console.log('screenshots were saved');
  })
  .on('error', function(err) {
    console.log('an error happened: ' + err.message);
  })
  // take 2 screenshots at predefined timemarks and size
  .takeScreenshots({ count: 2, timemarks: [ '00:00:02.000', '6' ], size: '150x100' }, './thumbnails');
  }
}