const credential = require('../src/credential');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: credential.host,
    user: credential.user,
    password: credential.pass,
    database: credential.db,
  },
});

const getGenreCount = function () {
  return knex('top_movies')
    .innerJoin(
      'movie_genre',
      'top_movies.top_movie_id',
      'movie_genre.top_movie_id',
    )
    .innerJoin('genres', 'movie_genre.genre_id', 'genres.genre_id')
    .groupBy('genres.genre_id')
    .select('genre', knex.raw('COUNT(*) AS count'));
};

const getFormattedGenreCount = function () {
  return getGenreCount()
    .then((result) => {
      const labels = result.map(element => element.genre);
      const counts = result.map(element => element.count);
      console.log(counts);
      const datasets = [
        {
          label: 'Top 100',
          backgroundColor: '#F07883',
          data: counts,
        },
      ];
      return {
        labels,
        datasets,
      };
    });
};


const getLanguageCount = function () {
  return knex('top_movies')
    .groupBy('original_language')
    .select('original_language', knex.raw('COUNT(*) as count'));
};

const getFormattedLanguageCount = function () {
  getLanguageCount()
    .then((result) => {
      const labels = result.map(element => element.original_language);
      const counts = result.map(element => element.count);
      console.log(counts);
      const datasets = [
        {
          label: 'Top 100',
          backgroundColor: '#F07883',
          data: counts,
        },
      ];
      return {
        labels,
        datasets,
      };
    });
};

module.exports = {
  getGenreCount,
  getLanguageCount,
  getFormattedGenreCount,
  getFormattedLanguageCount,
};
