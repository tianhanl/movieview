const express = require('express');
const path = require('path');
const database = require('./server/database');

const app = express();


app.set('port', process.env.PORT || 3000);
// eslint-disable-next-line no-undef
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.type('.html');
  // eslint-disable-next-line no-undef
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/list/:page', (req, res) => {
  res.type('.html');
  // eslint-disable-next-line no-undef
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/detail/:id', (req, res) => {
  res.type('.html');
  // eslint-disable-next-line no-undef
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/api/movie/top_rated', (req, res) => {
  const page = req.query.page;
  database.getTopMovie(Number.parseInt(page, 10))
    .then((result) => {
      console.log(result);
      const output = {
        page,
        results: result,
        total_results: 100,
        total_pages: 8,
      };
      console.log(output);
      res.json(output);
    })
    .catch((err) => {
      console.log(err);
      // eslint-disable-next-line no-undef
      next();
    });
});

app.use((req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Page Not Found');
});

app.listen(app.get('port'), () => {
  console.log('Server Started');
});

