module.exports = function(grunt) {
  grunt.initConfig({
    a11y: {
      dev: {
        options: {
          urls: [
            'output_*/docs/articles/drupal/**/*.html'
          ]
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-a11y');
  grunt.registerTask('default', ['a11y']);
}
