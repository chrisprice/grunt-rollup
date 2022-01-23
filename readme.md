# grunt-rollup
[![Build Status](https://badgen.net/travis/chrisprice/grunt-rollup/master)](https://travis-ci.org/chrisprice/grunt-rollup)
[![Plugin size](https://badgen.net/packagephobia/publish/grunt-rollup)](https://packagephobia.now.sh/result?p=grunt-rollup)

> Grunt plugin for [rollup](https://github.com/rollup/rollup) - next-generation ES6 module bundler

## Getting Started
This plugin requires Grunt `>=0.4.0` and node `>=8.6.0`.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-rollup --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-rollup');
```

## The "rollup" task

### Overview
In your project's Gruntfile, add a section named `rollup` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  rollup: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

Supports all the options from [rollup's JavaScript API](https://rollupjs.org/guide/en/#javascript-api).


### Sourcemaps

A value of `true` for `sourceMap` will output the map to a file with the same name as the JavaScript with `.map` appended. A value of `inline` for `sourceMap` will inline the sourcemap into the source file.

### Usage Examples

```js
grunt.initConfig({
  rollup: {
    options: {},
    files: {
      'dest/bundle.js': 'src/entry.js',
    },
  },
});
```

### Usage with Plugins

```js
var babel = require('@rollup/plugin-babel').default;

grunt.initConfig({
  rollup: {
    options: {
      plugins: [
        babel({
          exclude: './node_modules/**'
        })
      ]
    },
    files: {
      'dest/bundle.js': 'src/entry.js',
    },
  },
});
```

#### Plugin getter

Some plugins are stateful and this doesn't play nice with multiple bundles.
For example the `rollup-plugin-babel` plugin keeps a track of used `babel` helpers, and passing the configured plugin only once will cause the helpers to leak from one bundle to another.
To prevent that, pass a function that returns an array of plugins, like this:

```js
var babel = require('rollup-plugin-babel');

grunt.initConfig({
  rollup: {
    options: {
      plugins: function() {
        return [
          babel({
            exclude: './node_modules/**'
          })
        ];
      }
    },
    files: {
      'dest/bundle.js': 'src/entry.js',
      'dest/bundle2.js': 'src/entry2.js',
    },
  },
});
```

This way the plugin will be refreshed for each bundle.

## Contributing
Any contributions is welcomed. Make sure to read [the contributing manual](contributing.md) for more information.

### Contributors
| [![chrisprice](https://github.com/chrisprice.png?size=99)<br><b>chrisprice</b>](https://github.com/chrisprice) | [![GMartigny](https://github.com/GMartigny.png?size=99)<br><b>GMartigny</b>](https://github.com/GMartigny) | [![scythianfuego](https://github.com/scythianfuego.png?size=99)<br><b>scythianfuego</b>](https://github.com/scythianfuego) |
| --- | --- | --- |
> All contributions are valued, you can add yourself to this list (or request to be added) whatever your contribution is.
<!--
Use this pattern to add yourself:
[![FULL NAME or USERNAME](https://github.com/USERNAME.png?size=99)<br><b>USERNAME</b>](https://github.com/USERNAME)
-->

## License 

[MIT](license)
