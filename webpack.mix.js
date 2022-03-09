const mix = require('laravel-mix');

mix.ts('resources/js/index.tsx', 'public/js')
    .sourceMaps()
    .react()
    .extract(["react"])
    .sass('resources/sass/app.scss', 'public/css')
;
