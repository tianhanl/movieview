/* eslint-disable import/no-extraneous-dependencies */
import credential from './credential';

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: credential.host,
    user: credential.user,
    password: credential.pass,
    database: credential.db,
  },
});

const getTopMovie = function () {
  return knex('top_movies')
};

export default {
  getTopMovie,
};
