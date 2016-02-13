'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });

    this.log('Creating ' + this.name + ' page.');
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('page.html'),
      this.destinationPath('www/components/pages/pg-'+this.name+'.html'),
      this
    );
  }
});
