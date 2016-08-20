app.factory('$help', function ($mdToast) {
  return {
    toast: function (text) {
      $mdToast.show($mdToast.simple().textContent(text));
    }
  };
});
