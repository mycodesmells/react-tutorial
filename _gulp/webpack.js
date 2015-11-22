var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');

gulp.task('webpack', function () {

    var config = {
        watch: global.isWatching,
        entry: './src/js/index.jsx',
        output: {
            path: "./public",
            filename: "index.js"
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        module: {
            loaders: [
                { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets:['react', 'es2015'] } }
            ]
        }
    };

    webpack(config, function (err, stats) {

        if (err) {
            throw new gutil.PluginError('webpack', err);
        }

        gutil.log('[webpack]', stats.toString({
            colors: true,
            chunkModules: false
        }));

    });
});
