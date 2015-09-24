// Disable notify
process.env.DISABLE_NOTIFIER = true;

// I need some magic
var elixir = require('laravel-elixir');

// Hi browserify, meet vueify. Vueify, meet browserify
elixir.config.js.browserify.transformers.push({
    name: 'vueify'
});

// Generate .map files for easier debugging
elixir.config.js.browserify.options.debug = true;

// Magic unicorns below
elixir(function(mix) {
    mix.sass('app.scss');
    mix.browserify('bootstrap.js', 'public/js/app.js');
});