import axios from 'axios';
import credential from './credential';

const movieAPIDomain = 'https://api.themoviedb.org/3';

const getTopRatedMovies = function () {
  const topRatedAPI = `/movie/top_rated?api_key=${credential.apiKey}`;
  return axios.get(movieAPIDomain + topRatedAPI);
};

const getMovieDetail = function (movieID) {
  const movieDetailAPI = `/movie/${movieID}?api_key=${credential.apiKey}`;
  return axios.get(movieAPIDomain + movieDetailAPI);
};


export default {
  getTopRatedMovies,
  getMovieDetail,
};
