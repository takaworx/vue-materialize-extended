let mix = require('laravel-mix');

mix.options({
    publicPath: 'public',
});

mix.js('src/demo/app.js', 'public/js')
   .sass('src/demo/app.scss', 'public/css');

if (mix.inProduction()) {
   mix.version();
}
