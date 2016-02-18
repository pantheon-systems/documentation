module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      main: {
        files: [
          {expand: true, src: ['node_modules/bootstrap/dist/**'], dest: 'source/docs/assets/'},
          {expand: true, src: ['node_modules/highlight.js/styles/tomorrow-night-eighties.css'], dest: 'source/docs/assets/'},
          {expand: true, src: ['node_modules/node-font-awesome/node_modules/font-awesome/css/font-awesome.min.css'], dest: 'source/docs/assets/'},
          {expand: true, src: ['node_modules/node-font-awesome/node_modules/font-awesome/fonts/**'], dest: 'source/docs/assets/'}
        ],
      },
    },
    css_url_replace: {
      options: {
        staticRoot: 'source'
      },
      replace: {
        files: {
          'source/docs/assets/compiled/compiled.css': [
            'source/docs/assets/node_modules/highlight.js/styles/tomorrow-night-eighties.css',
            'source/docs/assets/node_modules/node-font-awesome/node_modules/font-awesome/css/font-awesome.min.css',
            'source/docs/assets/node_modules/bootstrap/dist/css/bootstrap.min.css',
            'source/docs/assets/node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'source/docs/assets/css/main.css',
            'source/docs/assets/fonts/pan-docs-icons/css/pan-docs.css',
            'source/docs/assets/css/jquery.tocify.css'
          ],
        }
      }
    },
    a11y: {
      dev: {
        options: {
          failOnError: 'true',
          files: [
            'output_dev/**/*.html',
            'output_dev/docs/**/*.html',
            'output_dev/docs/contributors/**/*.html',
            'output_dev/docs/categories/**/*.html',
            'output_dev/docs/tags/**/*.html',
            'output_dev/docs/changelog/**/*.html',
            'output_dev/docs/guides/**/*.html',
            'output_dev/docs/guides/contributors/**/*.html',
            'output_dev/docs/guides/categories/**/*.html',
            'output_dev/docs/guides/tags/**/*.html',
            'output_dev/docs/search/*.html'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-css-url-replace');
  grunt.loadNpmTasks('grunt-a11y');

  grunt.registerTask('default', ['copy', 'css_url_replace']);
  grunt.registerTask('test', ['a11y']);
}
