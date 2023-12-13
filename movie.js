const express = require('express');

const router = express.Router();

const fetch = require('node-fetch');

const api = require('./apiInfo');

router.get('/', function (req, res) {
    res.render('index', {
        message: 'hello, pug',
    });
});

router.get('/playing/:page?', function (req, res) {
    const page = req.params.page ? req.params.page : 1;

    const url =
        'https://api.themoviedb.org/3/movie/now_playing?language=ko&page=' +
        page;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + api.ACCESS_TOKEN,
        },
    };

    fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
            const $date = json.dates.minimum + ' ~ ' + json.dates.maximum;
            const $movies = json.results;
            const page = json.page < json.total_pages ? json.page + 1 : '';
            const less = json.page != 1 ? json.page - 1 : '';

            res.render('playing', {
                date: $date,
                movielist: $movies,
                page: page,
                less: less,
            });
        })
        .catch((err) => console.error('error:' + err));
});

router.get('/playing/:page?', function (req, res) {
    const page = req.params.page ? req.params.page : 1;

    const url =
        'https://api.themoviedb.org/3/movie/now_playing?language=ko&page=' +
        page;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + api.ACCESS_TOKEN,
        },
    };

    fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
            const $date = json.dates.minimum + ' ~ ' + json.dates.maximum;
            const $movies = json.results;
            const page = json.page < json.total_pages ? json.page + 1 : '';
            const less = json.page != 1 ? json.page - 1 : '';

            res.render('playing', {
                date: $date,
                movielist: $movies,
                page: page,
                less: less,
            });
        })
        .catch((err) => console.error('error:' + err));
});

router.get('/all-movie', function (req, res) {
    let genres;

    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=ko';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + api.ACCESS_TOKEN,
        },
    };

    fetch(url, options)
        .then((res) => res.json())
        .then((json) => (genres = json.genres));

    const url2 =
        'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';

    fetch(url2, options)
        .then((res) => res.json())
        .then((json) =>
            res.render('all-movie', {
                results: json.results,
                genres: genres,
            }),
        )
        .catch((err) => console.error('error:' + err));
});

module.exports = router;
