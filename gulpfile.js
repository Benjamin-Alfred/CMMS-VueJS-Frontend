var elixir = require('laravel-elixir');

elixir.config.js.browserify.transformers.push({
    name: 'vueify'
});

elixir(function(mix) {
    mix.sass('app.scss');
    mix.browserify('app.js');
});