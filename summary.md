# Summary
## Topic and Purpose
This website will display top rated movies from themoviedb, and users can click to view detail about each movie.

## Instructions
### Frontend Website
The built version is inside dist folder. It can be directly used to display the website.

To rebuild this website, type following commands in terminal:
``` bash
npm run build
```

To examine this website, type:
``` bash
npm run dev
```
This will invoke webpack server and host the site at `http://localhost:8080/`

### Server
A server is required to provide APIs for self-stored data.

To run the server, type following commands in terminal:
``` bash
npm run server

# Alternatively use pm2 to keep the process running
pm2 start server/server.js

```

## Database Diagram

## Data Source
Data are collected from themoviedb via its official APIs.

It is stored in a MySQL database hosted by ITP.

Data are divided into three tables, top_movie, movie_genres, and genres. movie_genres is used to store different genres for a same movie since there is no array in MySQL.

## Extras
### Pagination
### Front-end Back-end AJAX

### Frameworks
[Vue](https://vuejs.org/v2/guide/)
[Express](https://expressjs.com/en/guide/routing.html)
### External Libraries
[axios](https://github.com/axios/axios)
[chart.js](https://github.com/yusufshakeel/chartjs)
[animejs](https://github.com/juliangarnier/anime)
[knex](https://github.com/tgriesser/knex)
[moment](https://github.com/moment/moment)
[muse-ui](https://github.com/museui/muse-ui)
### APIs
[The MovideDB](https://developers.themoviedb.org/3/getting-started)