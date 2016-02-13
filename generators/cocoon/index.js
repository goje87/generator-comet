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
          type: 'input'
        }
      ];

      this.prompt(prompts, function(answers) {
        this.props.id = answers.id;
        done();
      }.bind(this));
  },

  writing: function() {
    [
      'hooks',
      'platforms',
      'plugins',
      'www/start.html',
      'www/css',
      'www/img',
      // 'www/res',
      'config.xml'
    ].map(function(path) {
      this.fs.copyTpl(
        this.templatePath(path),
        this.destinationPath(path),
        this.props
      )
    }.bind(this));

    this.fs.copy(
      this.templatePath('www/res'),
      this.destinationPath('www/res')
    );
  },

  install: function () {
    this.npmInstall(['cocoonjs@^1.0.0-0.9.0'], {saveDev: true}, function() {
      this.spawnCommand('cocoonjs', ['create', '.', this.props.id, this.props.camelCasedName]);
      this.spawnCommand('cocoonjs', 'platform add android'.split(' '));
      this.spawnCommand('cocoonjs', 'plugin add com.ludei.webview.plus'.split(' '));
    }.bind(this));
  }
});
