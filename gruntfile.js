/*global module:false*/
module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cfg: {
			compiled : 'demo',
			vendors  : 'src/vendors',
			js  	 : 'src/assets/js',
			css   	 : 'src/assets/css'
		},

		jshint: {
			options: { jshintrc: '.jshintrc' },
			files: [ '<%= cfg.js %>/**/*.js' ]
		},

		concat: {
			js: { 
				files: { 
					'<%= cfg.compiled %>/scripts.js': [
						'<%= cfg.vendors %>/jQuery/js/jquery-2.0.3.js',
						'<%= cfg.js %>/**/*.js'
					]
				}
			},
			css: { 
				files: { 
					'<%= cfg.compiled %>/styles.css': [
						'<%= cfg.css %>/**/*.css'
					]
				}
			}
		},

		watch: {
			options: { livereload: true },
			js:  { files: '<%= cfg.js %>/**/*.js',  tasks: [ 'concat:js' ] },
			css: { files: '<%= cfg.css %>/**/*.css', tasks: [ 'concat:css' ] }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', [ 'jshint', 'concat' ]);
};
