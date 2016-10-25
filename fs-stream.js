const fs = require('fs');
const stream = fs.createReadStream('package.json');

stream.on('data', data => {
    console.log(data.toString());
});

stream.on('end', data => {
    console.log('end');
});