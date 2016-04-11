'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.props = this.config.get('props');
  },

  prompting: function() {
    var
      done = this.async(),
      prompts = [
        {
          message: 'Id for the project (reverse domain style):',
          name: 'id',
          type: 'input',
          default: this.props.id
        }
      ];

      this.prompt(prompts, function(answers) {
        this.props.id = answers.id;
        this.config.set('props', this.props);

        done();
      }.bind(this));
  },

  writing: function() {
    [
      'config.xml',
      'sh/mobileAppSetup.sh'
    ].map(function(path) {
      this.fs.copyTpl(
        this.templatePath(path),
        this.destinationPath(path),
        this.props
      )
    }.bind(this));
  },

  install: function () {
    this.spawnCommand('sh', ['sh/mobileAppSetup.sh']);
  }
});
