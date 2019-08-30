module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      main: {
        files: [
          {expand: true, src: ['node_modules/bootstrap/dist/**'], dest: 'source/docs/assets/'},
          {expand: true, src: ['node_modules/bootstrap/dist/css/bootstrap'], dest: 'source/docs/assets/compiled/'},
          {expand: true, src: ['node_modules/highlight.js/styles/tomorrow-night-bright.css'], dest: 'source/docs/assets/'},
          {expand: true, src: ['node_modules/node-font-awesome/node_modules/font-awesome/css/font-awesome.min.css'], dest: 'source/docs/assets/'},
          {expand: true, src: ['node_modules/node-font-awesome/node_modules/font-awesome/fonts/**'], dest: 'source/docs/assets/'},
          {expand: true, src: ['node_modules/clipboard/dist/clipboard.min.js'], dest: 'source/docs/assets/js/'},
          {expand: true, src: ['node_modules/angular/angular.min.js'], dest: 'source/docs/assets/js'},
          {expand: true, src: ['node_modules/angular/angular.min.js.map'], dest: 'source/docs/assets/js'},
          {expand: true, src: ['node_modules/angular-material/angular-material.min.js'], dest: 'source/docs/assets/js/'},
          {expand: true, src: ['node_modules/angular-animate/angular-animate.min.js'], dest: 'source/docs/assets/js/'},
          {expand: true, src: ['node_modules/angular-animate/angular-animate.min.js.map'], dest: 'source/docs/assets/js/'},
          {expand: true, src: ['node_modules/angular-aria/angular-aria.min.js'], dest: 'source/docs/assets/js/'},
          {expand: true, src: ['node_modules/angular-aria/angular-aria.min.js.map'], dest: 'source/docs/assets/js/'},
          {expand: true, src: ['node_modules/marked/lib/marked.js'], dest: 'source/docs/assets/js/'},
          {expand: true, src: ['node_modules/angular-md/dist/angular-md.js'], dest: 'source/docs/assets/js/'}
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
            'source/docs/assets/node_modules/highlight.js/styles/tomorrow-night-bright.css',
            'source/docs/assets/node_modules/node-font-awesome/node_modules/font-awesome/css/font-awesome.min.css',
            'source/docs/assets/node_modules/bootstrap/dist/css/bootstrap.min.css',
            'source/docs/assets/css/main.css',
            'source/docs/assets/fonts/pan-docs-icons/css/pan-docs.css',
            'source/docs/assets/fonts/MyFontsWebfontsKit/MyFontsWebfontsKit.css',
          ],
        }
      }
    },
    replace: {
      dist: {
        options: {
          patterns: [
            {
              json: {
                "sourceMappingURL=bootstrap.min.css.map": "sourceMappingURL=/docs/assets/node_modules/bootstrap/dist/css/bootstrap.min.css.map"
              }
            }
          ],
          usePrefix: false
        },
        files: [
          {src: ['source/docs/assets/compiled/compiled.css'], dest: 'source/docs/assets/compiled/compiled.css'}
        ]
      }
    },
    watch: {
      files: [
        'source/docs/assets/node_modules/*',
        'source/docs/assets/css/*',
        'source/docs/assets/fonts/*',
      ],
      tasks: ['copy', 'css_url_replace', 'replace']
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
            'output_dev/docs/search/*.html'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-css-url-replace');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-a11y');

  grunt.registerTask('default', ['copy', 'css_url_replace', 'replace']);
  grunt.registerTask('test', ['a11y']);
}
