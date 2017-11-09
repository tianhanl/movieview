const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'movieview/dist')));

app.get('/', (req, res) => {
  res.type('.html');
  // eslint-disable-next-line no-undef
  res.sendFile(`${__dirname}/index.html`);
});

app.use((req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Page Not Found');
});

app.listen(app.get('port'), () => {
  console.log('Server Started');
});

