# Vue.js Starter Website
This package serves as a starter for you to build a single page Vue.js website. It uses vue-router and browserify to keep everyting nicely separated, and makes use of Laravel Elixir to avoid a huge Gulpfile (Laravel Elixir has nothing to do with the Laravel Framework, this package has no relation to that whatsoever).


## Usage

### Step 1: Install the dependencies
This will install the dependencies of this starter website. It will pull in several packages like Vue, Vueify, vue-router, gulp and Laravel Elixir (this is just suger for gulp, basically).

```
npm install
```

### Step 2: Run Gulp
Gulp will compile the Sass stylesheets and run browserify. All the source files are in the 'resources' folder and will publish the results to the 'public' folder.

```
gulp
```

### Step 3: Serve it
You can now serve the files using your webserver of choice.
If you would like to start a simple ad-hoc webserver to test this out, you can use the following one-liner:
```
cd public/
python -m SimpleHTTPServer 8888
```
and then hit http://localhost:8888

Or even better, you can use browser-sync and have your site auto-reload when changes are detected.
```
npm install -g browser-sync
cd public/
browser-sync start --server --files "js/*.js, css/*.css"
```
browser-sync will then output the URL's on which you can access the site.

## Thanks
Thanks Taylor Otwell for your Laravel Spark styling. I used some of it.