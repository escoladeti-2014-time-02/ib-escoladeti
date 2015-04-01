/**=========================================================
 * Module: chosen-select.js
 * Initializes the chose select plugin
 =========================================================*/

App.directive('validateForm', function() {
  return {
    restrict: 'A',
    controller: function($scope, $element) {
      var $elem = $($element);
      if($.fn.parsley)
        $elem.parsley();
    }
  };
});
