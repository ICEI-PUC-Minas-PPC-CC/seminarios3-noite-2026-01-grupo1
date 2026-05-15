const Jimp = require('jimp');

Jimp.read('./src/assets/images/TransitionScreen.png')
  .then(image => {
    const w = image.bitmap.width;
    const h = image.bitmap.height;
    const redPixels = [];

    for(let y = 0; y < h; y+=2) {
      for(let x = 0; x < w; x+=2) {
        const color = Jimp.intToRGBA(image.getPixelColor(x, y));
        // Simple red check
        if(color.r > 200 && color.g < 100 && color.b < 100) {
          redPixels.push({x: (x/w)*100, y: (y/h)*100});
        }
      }
    }

    const clusters = [];
    for(const p of redPixels) {
      let found = false;
      for(const c of clusters) {
        if(Math.abs(c.x - p.x) < 5 && Math.abs(c.y - p.y) < 5) {
          c.x = (c.x * c.count + p.x) / (c.count + 1);
          c.y = (c.y * c.count + p.y) / (c.count + 1);
          c.count++;
          found = true;
          break;
        }
      }
      if(!found) {
        clusters.push({x: p.x, y: p.y, count: 1});
      }
    }

    clusters.sort((a,b) => a.x - b.x);
    console.log("Clusters:", clusters.filter(c => c.count > 10).map(c => ({x: c.x.toFixed(1), y: c.y.toFixed(1), count: c.count})));
  })
  .catch(err => {
    console.error(err);
  });
