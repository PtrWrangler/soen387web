angular.module('erp', [])
.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
})
.factory('authInterceptor', function($q, $window) {
  return {
    responseError: function(rejection) {
      if (rejection.status == 403) {
        $window.location.href = '/login.html';
      }

      return $q.reject(rejection);
    }
  };
})
.controller('LoginCtrl', function($http, $scope, $window) {
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
      $window.location.href = '/index.html';
    });
  };
})
.controller('CalendarCtrl', function($http, $scope) {
  $scope.currentTime = moment().format("dddd, MMMM Do YYYY, h:mm a");

  $http.get('/reservations').then(function(response) {
    loadCalendar(response.data.body);
  });

  $scope.navigate = function(direction) {
    $scope.calendar.navigate(direction);
  };

  $scope.view = function(view) {
    $scope.calendar.view(view);
  };

  function loadCalendar(data) {
    $scope.calendar = $("#calendar").calendar({
      tmpl_path: "/bower_components/bootstrap-calendar/tmpls/",

      onAfterViewLoad: function(view) {
        $scope.title = this.getTitle();
        $scope.currentView = view;
      },

      events_source: function () {
        return data.map(function(i) {
          i.title = i.room_type.charAt(0).toUpperCase() + i.room_type.slice(1) + ' - ' + i.room_number;
          i.url = 'event.html?id=' + i.id;
          i.class = 'event-important';
          i.start = Date.parse(i.start_time);
          i.end = Date.parse(i.end_time);
          return i;
        });
      }
    });
  }
});
