app.factory('$help', function (toastr, $mdDialog) {
  return {
    
    toast: function (text) {
      toastr.success(text, 'INFO');
    },
    
    modalSimple: function(template, controller) {
      $mdDialog.show({
        controller: controller,
        templateUrl: template,
        parent: angular.element(document.body),
        clickOutsideToClose: true
      });
    }
  };
});
