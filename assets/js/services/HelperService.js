app.factory('$help', function ($mdToast, $mdDialog) {
  return {
    toast: function (text) {
      var tempToast = $mdToast.simple()
      .content(text)
      .hideDelay(2000)
      .parent(angular.element(document.body));
      $mdToast.show(tempToast);
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
