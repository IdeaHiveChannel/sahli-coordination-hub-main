const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://assets.mixkit.co/videos/preview/mixkit-customer-service-representative-working-at-a-computer-4540-large.mp4';
const dest = path.join(__dirname, '../public/videos/contact-hero.mp4');

const dir = path.dirname(dest);
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

console.log(`Downloading video to ${dest}...`);
const file = fs.createWriteStream(dest);
https.get(url, function(response) {
  if (response.statusCode !== 200) {
      console.error(`Failed to download: ${response.statusCode} ${response.statusMessage}`);
      return;
  }
  response.pipe(file);
  file.on('finish', function() {
    file.close(() => {
        console.log('Video downloaded successfully');
    });
  });
}).on('error', function(err) { 
  fs.unlink(dest, () => {}); 
  console.error('Error downloading video:', err.message);
});
