/**=========================================================
 * Module: datepicker,js
 * DateTime Picker init
 =========================================================*/

App.directive('datetimepicker', function() {
  'use strict';

  return {
    restrict: 'A',
    controller: function($scope, $element) {
      var $elem = $($element),
          options = $elem.data(); // allow to set options via data-* attributes
      
      $elem.datetimepicker($.extend(
        options,
        { // support for FontAwesome icons
          icons: {
              time:   'fa fa-clock-o',
              date:   'fa fa-calendar',
              up:     'fa fa-arrow-up',
              down:   'fa fa-arrow-down'
          }
        }));

      // Force a dropdown hide when click out of the input
      $(document).on('click', function(){
        var dp = $elem.data('DateTimePicker');
        if(dp) dp.hide();
      });
      
    }
  };

});
