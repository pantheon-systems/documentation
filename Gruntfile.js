module.exports = function(grunt) {
  grunt.initConfig({
    a11y: {
      dev: {
        options: {
          urls: [
            'output_*/docs/about/*.html',
            'output_*/docs/articles/**/*.html',
            'output_*/docs/authors/**/*.html',
            'output_*/docs/changelog/**/*.html',
            'output_*/docs/guides/**/*.html',
            'output_*/docs/objects/*.html',
            'output_*/docs/search/*.html'
          ]
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-a11y');
  grunt.registerTask('default', ['a11y']);
}
