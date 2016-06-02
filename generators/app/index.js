'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

// Converts comma separated `str` to an array
function arrayfi(str) {
  if(_.isArray(str)) return str;

  return str.toString().split(/,\s?/);
}

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.props = this.config.get('props');
  },

  prompting: function () {
    var done = this.async(),
        props = this.props = this.props || {};

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the doozie ' + chalk.red('Comet') + ' generator!'
    ));

    var prompts = [
    {
      message: 'name:',
      name: 'name',
      type: 'input',
      default: props.name || this.appname
    },
    {
      message: 'version:',
      name: 'version',
      type: 'input',
      default: props.version || '0.0.1'
    },
    {
      message: 'description:',
      name: 'description',
      type: 'input',
      default: props.description
    },
    {
      message: 'keywords:',
      name: 'keywords',
      type: 'input',
      default: props.keywords
    },
    {
      message: 'authors:',
      name: 'authors',
      type: 'input',
      default: props.authors
    }];

    this.prompt(prompts, function (props) {
      props.keywords = arrayfi(props.keywords);
      props.authors = arrayfi(props.authors);

      _.extend(this.props, props);
      console.log(this.props);
      this.props.kebabCasedName = _.kebabCase(props.name);
      this.props.camelCasedName = _.camelCase(props.name);

      this.config.set('props', this.props);

      done();
    }.bind(this));

  },

  writing: {
    copyFiles: function () {

      [
        '.bowerrc',
        '.gitignore',
        'bower.json',
        'package.json',
        'server.js',
        'ecosystem.json',
        'sh/npmInstallGlobal.sh',
        'sh/setup.sh',
        'www/index.html',
        'www/cordova.js',
        'www/themes',
        'www/css',
        'www/js',
        'www/components/pages',
        'www/components/splash-screen',
        'config'
      ].map(function(path) {
        this.fs.copyTpl(
          this.templatePath(path),
          this.destinationPath(path),
          this.props
        );
      }.bind(this));

      var name = this.props.kebabCasedName;
      this.fs.copyTpl(
        this.templatePath('www/components/_app.html'),
        this.destinationPath('www/components/'+name+'-app/'+name+'-app.html'),
        this.props
      );

      //copy non-text files
      [
        'www/img'
      ].map(function(path) {
        this.fs.copy(
          this.templatePath(path),
          this.destinationPath(path)
        );
      }.bind(this));

      this.composeWith('comet:page', {args: ['home']});
    }
  },

  install: function () {
    this.installDependencies({
      callback: function() {
        this.spawnCommand('sh', ['sh/setup.sh']);
      }.bind(this)
    });

  }
});
