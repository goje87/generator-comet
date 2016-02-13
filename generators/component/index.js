'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The component name'
    });

    this.argument('location', {
      required: false,
      type: String,
      desc: 'The location of component',
      default: this.name
    });
  },

  writing: function () {

    if(!~this.name.indexOf('-')) {
      this.log('Component name should contain `-`');
      return;
    }

    var
      name = this.name,
      location = this.location || name;

    this.fs.copyTpl(
      this.templatePath('component.html'),
      this.destinationPath('www/components/'+location+'/'+name+'.html'),
      this
    );
  }
});
