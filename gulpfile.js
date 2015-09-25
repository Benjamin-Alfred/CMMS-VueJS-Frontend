// Disable notify
process.env.DISABLE_NOTIFIER = true;

// I need some magic
var elixir = require('laravel-elixir');

// Hi browserify, meet vueify. Vueify, meet browserify
elixir.config.js.browserify.transformers.push({ name: 'vueify' });
elixir.config.js.browserify.transformers.push({ name: 'envify' });

// Generate source map for easier debugging in dev tools
elixir.config.js.browserify.options.debug = true;

// Magic unicorns below
elixir(function(mix) {
    mix.sass('app.scss');
    mix.browserify('bootstrap.js', 'public/js/app.js');
});