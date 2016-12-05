angular.module('erp', []).
controller('LoginCtrl', function($http, $scope, $window) {
  $scope.login = function() {
    if (!$scope.username && !$scope.password) {
      $scope.error = 'Please enter both username and password';
    }

    $http.post('/login', {
      user_id: $scope.username,
      user_password: $scope.password
    }).then(function(response) {
      if (response.data.status === false) {
        $scope.error = 'Incorrect username and/or password';
        return;
      }

      // Redirect to reservations
      $window.location.href = '/view.html';
    });
  };
});
