/*global requirejs */

requirejs.config({
  baseUrl: '/js',
  paths: {
    jquery: 'vendor/jquery/jquery',
    underscore: 'vendor/underscore/underscore',
    hbs: 'vendor/require-handlebars-plugin/hbs'
  },
  hbs: { // optional
    partialsUrl: '/templates/partials'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    jquery: {
      exports: '$'
    }
  }
});