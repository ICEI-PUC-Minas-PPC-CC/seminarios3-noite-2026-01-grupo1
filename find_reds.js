/* global require */
const Jimp = require('jimp');

Jimp.read('./src/assets/images/TransitionScreen.png')
  .then((image) => {
    const w = image.bitmap.width;
    const h = image.bitmap.height;
    const redPixels = [];

    for (let y = 0; y < h; y += 2) {
      for (let x = 0; x < w; x += 2) {
        const color = Jimp.intToRGBA(image.getPixelColor(x, y));
        if (color.r > 200 && color.g < 100 && color.b < 100) {
          redPixels.push({ x: Math.round((x / w) * 100), y: Math.round((y / h) * 100) });
        }
      }
    }

    const clusters = [];
    for (const pixel of redPixels) {
      let found = false;
      for (const cluster of clusters) {
        if (Math.abs(cluster.x - pixel.x) < 5 && Math.abs(cluster.y - pixel.y) < 5) {
          cluster.x = (cluster.x * cluster.count + pixel.x) / (cluster.count + 1);
          cluster.y = (cluster.y * cluster.count + pixel.y) / (cluster.count + 1);
          cluster.count += 1;
          found = true;
          break;
        }
      }
      if (!found) {
        clusters.push({ x: pixel.x, y: pixel.y, count: 1 });
      }
    }

    clusters.sort((a, b) => a.x - b.x);
    console.log('Found clusters:', clusters.filter((cluster) => cluster.count > 5).map((cluster) => ({
      x: Math.round(cluster.x),
      y: Math.round(cluster.y),
      size: cluster.count,
    })));
  })
  .catch((err) => {
    console.error(err);
  });
