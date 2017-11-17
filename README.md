# CMMS Vue.js Frontend
This is a Vue.js Frontend for the [CMMS Core API](https://github.com/APHLK/CMMS-Core-API) based on [Koen Calliauw's Vue.js starter for a single page website](https://github.com/layer7be/vue-starter-laravel-api). It uses vue-router and browserify to keep everyting nicely separated, and makes use of Laravel Elixir to avoid a huge Gulpfile.

## Usage

### Step 1: Install the dependencies
This will install the dependencies of this starter website. It will pull in several packages like Vue, Vueify, vue-router, gulp and Laravel Elixir (this is just magic syntactical sugar for gulp, basically).

```
npm install
```

### Step 2: Decide on the environment
In resources/assets/js/config you will find configuration files for the various environments you may have. By default, the "development" environment file will be loaded. If you want to load another configuration, you need to export the environment variable APP_ENV to be what you want to want the configuration to be. To do so easily you can precede the command gulp (or gulp watch) from the next step with APP_ENV=production if you want to build for production.


### Step 3: Run Gulp
Gulp will compile the Sass stylesheets and run browserify. All the source files are in the 'resources' folder and will publish the results to the 'public' folder.

```
gulp
```

As discussed in Step 2, you can opt to build for another environment, for example:

```
APP_ENV=production gulp
```

Note, this will work on Linux and MacOSX. If somebody knows how to do this properly from the command line in Windows (or if it's the same) please fork the repo and send a PR for this README.

### Step 4: Serve it
You can now serve the files using your webserver of choice.
If you would like to start a simple ad-hoc webserver to test this out, you can use the following one-liner:
```
cd public/
python -m SimpleHTTPServer 8888
```
and then hit http://localhost:8888

Or even better, you can use browser-sync and have your site auto-reload when changes are detected, which is ideal when developing.
```
npm install -g browser-sync
cd public/
browser-sync start --server --files "js/*.js, css/*.css"
```
browser-sync will then output the URL's on which you can access the site.

### Step 5: Login
If you followed the instructions in the companion repo and chose to use db:seed, check users' seed file for default login credentials

## License
MIT License. See LICENSE file.

## Credits
Thanks to Koen Calliauw and Taylor Otwell.
