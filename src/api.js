import axios from 'axios';
import credential from './credential';

const movieAPIDomain = 'https://api.themoviedb.org/3';
const serverAPIDomain = 'http://ec2-18-216-86-71.us-east-2.compute.amazonaws.com/api';
// page minimum 1, maximum 1000
const getTopRatedMovies = function (page) {
  const topRatedAPI = `/movie/top_rated?api_key=${credential.apiKey}&page=${page}`;
  return axios.get(serverAPIDomain + topRatedAPI);
};

const getMovieDetail = function (movieID) {
  const movieDetailAPI = `/movie/${movieID}?api_key=${credential.apiKey}`;
  return axios.get(movieAPIDomain + movieDetailAPI);
};


export default {
  getTopRatedMovies,
  getMovieDetail,
};
