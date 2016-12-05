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
  var terminusCompareApp = angular.module('terminusCompareApp', ['ngMaterial']);

  terminusCompareApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
  });

  terminusCompareApp.controller('mainController', function($scope, $http) {
    $scope.searchCommand   = '';
    $scope.terminus = [];
    $http.get("/docs/assets/terminus/compare.json").success(function(response){
      $scope.terminus = response;
    });
    $scope.clearFilters = function(){
          $scope.searchCommand =  undefined;
      };
  });
  //Sort usage array by relevance based on Regex matches from search query
  terminusCompareApp.filter('search', function() {
    return function (items, str) {
      if(str == '') return items;
      var filtered = [];
      var rgx = new RegExp(str, 'gi');

      angular.forEach(items, function(item) {
        item.points = (JSON.stringify(item).match(rgx) || []).length;
        filtered.push(item);
      });
    return filtered;
  }
  });
