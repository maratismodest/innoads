const fs = require('fs');
// const path = require('path');

const content = 'Hello, world!';

fs.writeFile('./..' + '/' + 'test.txt', content, err => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('File created successfully');
  }
});
