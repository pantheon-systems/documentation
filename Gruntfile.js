module.exports = function(grunt) {
  grunt.initConfig({
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
  grunt.loadNpmTasks('grunt-a11y');
  grunt.registerTask('default', ['a11y']);
}
