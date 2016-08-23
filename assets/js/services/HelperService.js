app.factory('$help', function ($mdToast) {
  return {
    toast: function (text) {
      var tempToast = $mdToast.simple()
      .content(text)
      .hideDelay(2000)
      .parent(angular.element(document.body));
      $mdToast.show(tempToast);
    }
  };
});
