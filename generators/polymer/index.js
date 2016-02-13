'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('element', {
      required: true,
      type: String,
      desc: 'The Polymer element name'
    });
  },

  install: function() {
    this.bowerInstall(['PolymerElements/'+this.element], {save: true});
  }
});
