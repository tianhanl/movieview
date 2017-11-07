/* eslint-disable import/no-extraneous-dependencies */
import Knex from 'knex';
import credential from './credential';

const knex = Knex({
  client: 'mysql',
  connection: {
    host: credential.host,
    user: credential.user,
    password: credential.pass,
    database: credential.db,
  },
});

const pageItemNumber = 12;
const itemCount = 100;

const getTopMovie = function (page) {
  if (typeof page !== 'number') {
    console.log('Page has to be a number');
    return Promise.reject(new Error('Page has to be a number'));
  }
  let offsetNumber = (page - 1) * pageItemNumber;
  if (offsetNumber > itemCount) offsetNumber = itemCount;
  return knex('top_movies')
    .innerJoin(
      'movie_genre',
      'top_movies.top_movie_id',
      'movie_genre.top_movie_id',
    )
    .innerJoin('genres', 'movie_genre.genre_id', 'genres.genre_id')
    .groupBy('top_movies.title')
    .orderBy('top_movies.top_movie_id')
    .limit(pageItemNumber)
    .offset(offsetNumber)
    .select(
      'title',
      'api_movie_id as id',
      'overview',
      'vote_average',
      'poster_path',
      'release_date',
      'vote_count',
      'popularity',
      knex.raw('GROUP_CONCAT(genre) genreList'),
    );
};

export default {
  getTopMovie,
};
