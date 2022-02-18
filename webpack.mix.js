// webpack.mix.js

const mix = require('laravel-mix');

mix.js('src/js/main.js', 'js').sourceMaps()
    .sass('src/scss/main.scss', 'css').sourceMaps()
    .setPublicPath('dist').browserSync("http://localhost/fetch.git");
