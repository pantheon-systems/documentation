  //Executes your code when the DOM is ready.  Acts the same as $(document).ready().
  $(function() {
      //Calls the tocify method on your HTML div.
      $("#toc").tocify();
  });

  //Allow html within tooltips and keep toggle open on hover
  $('.pop').popover({
      html: true,
      trigger: 'manual',
      container: $(this).attr('id'),
      placement: 'right'
  }).on("mouseenter", function () {
      var _this = this;
      $(this).popover("show");
      $(this).siblings(".popover").on("mouseleave", function () {
          $(_this).popover('hide');
      });
  }).on("mouseleave", function () {
      var _this = this;
      setTimeout(function () {
          if (!$(".popover:hover").length) {
              $(_this).popover("hide")
          }
      }, 300);
  });

  var client = new ZeroClipboard( $("span#scenario1button_create-backup") );
  var client = new ZeroClipboard( $("span#scenario1button_deploydev") );
  var client = new ZeroClipboard( $("span#scenario1button_deploytest") );
  var client = new ZeroClipboard( $("span#scenario2button_clear-cache") );
  var client = new ZeroClipboard( $("span#scenario3button_scenario3") );



  var terminusCommandsApp = angular.module('terminusCommandsApp', []);

  terminusCommandsApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
  });

  terminusCommandsApp.controller('mainController', function($scope, $http) {
    $scope.searchCommand   = '';
    $scope.commands = [];
    $http.get("/docs/assets/terminuscommands.json").success(function(response){
      $scope.commands = response;
    });
  });
