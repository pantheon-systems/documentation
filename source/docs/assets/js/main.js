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

  // Tooltip

  $('button').tooltip({
    trigger: 'click',
    placement: 'top'
  });

  function setTooltip(btn, message) {
    $(btn).tooltip('hide')
      .attr('data-original-title', message)
      .tooltip('show');
  }

  function hideTooltip(btn) {
    setTimeout(function() {
      $(btn).tooltip('hide');
    }, 3000);
  }

  // Clipboard

  var clipboard = new Clipboard('button');

  clipboard.on('success', function(e) {
    setTooltip(e.trigger, 'Copied!');
    hideTooltip(e.trigger);
  });

  clipboard.on('error', function(e) {
    setTooltip(e.trigger, 'Failed! Press Ctrl+C to copy');
    hideTooltip(e.trigger);
  });

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
    $scope.clearFilters = function(){
        $scope.searchCommand =  undefined;
    };
  });

  //Sort subcommands by relevance based on Regex matches from search query
  terminusCommandsApp.filter('search', function() {
  return function(items, str) {
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
