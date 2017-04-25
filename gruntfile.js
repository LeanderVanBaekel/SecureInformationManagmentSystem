module.exports = function(grunt) {
  grunt.initConfig ({
    sass: {
      options: {
        style: 'compressed',
        sourcemap: true
      },
      dist: {
        files: {
          'public/css/style.css' : 'assets/sass/main.sass'
        }
      }
    },

    postcss: {
      options: {
        map: true, // inline sourcemaps

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'public/css/style.css'
      }
    },

    watch: {
      source: {
        files: ['assets/sass/**/*'],
        tasks: ['sass', 'postcss']
      }
    }
  });

  grunt.registerTask('default', ['sass', 'postcss']);
  grunt.registerTask('test', ['sass']);

  // grunt.registerTask('watch', 'watch');

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');

};
