'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

// Converts comma separated `str` to an array
function arrayfi(str) {
  return str.split(/,\s?/);
}

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the doozie ' + chalk.red('Comet') + ' generator!'
    ));

    var prompts = [
    {
      message: 'name:',
      name: 'name',
      type: 'input',
      default: this.appname
    },
    {
      message: 'version:',
      name: 'version',
      type: 'input',
      default: '0.1.0'
    },
    {
      message: 'description:',
      name: 'description',
      type: 'input'
    },
    {
      message: 'keywords:',
      name: 'keywords',
      type: 'input'
    },
    {
      message: 'authors:',
      name: 'authors',
      type: 'input'
    }];

    this.prompt(prompts, function (props) {
      props.keywords = arrayfi(props.keywords);
      props.authors = arrayfi(props.authors);

      this.props = props;
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
        'bower.json',
        'package.json',
        'server.js',
        'setup.sh',
        'www/index.html',
        'www/themes',
        'www/css',
        'www/components/pages'
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

      this.composeWith('comet:page', {args: ['home']});
    }
  },

  install: function () {
    this.installDependencies();
  }
});
