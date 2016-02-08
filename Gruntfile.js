module.exports = function(grunt) {
  grunt.initConfig({
    a11y: {
      dev: {
        options: {
          failOnError: 'true',
          urls: [
            'output_dev/docs/about/*.html',
            'output_dev/docs/articles/**/*.html',
            'output_dev/docs/authors/**/*.html',
            'output_dev/docs/changelog/**/*.html',
            'output_dev/docs/guides/**/*.html',
            'output_dev/docs/search/*.html'
          ]
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-a11y');
  grunt.registerTask('default', ['a11y']);
}
