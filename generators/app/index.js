'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

	prompting: function() {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the gnarly ' + chalk.red('generator-handiest-react') + ' generator!'
		));

		var prompts = [{
			type: 'input',
			name: 'name',
			message: 'Your project name',
			default: this.appname
		}];

		this.prompt(prompts, function(props) {
			this.props = props;
			// To access props later use this.props.someAnswer;
			this.log(props.name);
			done();
		}.bind(this));
	},

	writing: {
		config: function() {
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'), {
					name: this.props.name
				}
			);

			this.fs.copyTpl(
				this.templatePath('_bower.json'),
				this.destinationPath('bower.json'), {
					name: this.props.name
				}
			);
			this.fs.copy(
				this.templatePath('bowerrc'),
				this.destinationPath('.bowerrc')
			);
		}
	},

	app: function() {
		//Server file
		this.fs.copyTpl(
			this.templatePath('_server.js'),
			this.destinationPath('server.js'),
			this.destinationPath('/views/index.ejs'), {
				name: this.props.name
			}
		);
		/////Routes
		this.fs.copy(
			this.templatePath('_routes/_all.js'),
			this.destinationPath('routes/all.js'));


		// Model
		this.fs.copy(
			this.templatePath('_model/_todo.js'),
			this.destinationPath('model/todo.js'));

		// Views
		this.fs.copyTpl(
			this.templatePath('_views/_index.ejs'),
			this.destinationPath('/views/index.ejs'), {
				name: this.props.name
			}
		);

		// Public/
		this.fs.copy(
			this.templatePath('_public/_css/_app.css'),
			this.destinationPath('public/css/app.css')
		);
		this.fs.copy(
			this.templatePath('_public/_js/_app.js'),
			this.destinationPath('public/js/app.js')
		);
	},

    install: function() {
    	this.installDependencies();
    }
});
