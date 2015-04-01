/**=========================================================
 * Module: anchor.js
 * Disables null anchor behavior
 =========================================================*/

App.directive('href', function() {

  return {
    restrict: 'A',
    compile: function(element, attr) {
        return function(scope, element) {
          if(attr.ngClick || attr.href === '' || attr.href === '#'){
            element.on('click', function(e){
              e.preventDefault();
              e.stopPropagation();
            });
          }
        };
      }
   };
});