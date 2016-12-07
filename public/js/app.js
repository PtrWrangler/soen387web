angular.module('erp', ['ngCookies'])
.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
})
.run(function($rootScope, $cookies, $window) {
  $rootScope.logout = function() {
    $cookies.remove('token');
    $window.location.href = '/login.html';
  };
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
.controller('LoginCtrl', function($rootScope, $http, $scope, $window) {
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
      $rootScope.UID = response.data.body.userId;

      // Redirect to reservations
      $window.location.href = '/index.html';
    });
  };
})
.controller('CalendarCtrl', function($http, $scope) {
  $scope.currentTime = moment().format("dddd, MMMM Do YYYY, h:mm a");

  $http.get('/reservations').then(function(response) {
    loadCalendar(response.data.body.reservations);
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
          console.log(i.date_start);
          if (i.type === 'Room') {
            i.id = $scope.reservation_id;
            i.title = i.room_type.charAt(0).toUpperCase() + i.room_type.slice(1) + ' - ' + i.room_number;
            i.url = 'event.html?id=' + i.reservation_id;
            i.class = 'event-important';
            i.start = Date.parse(i.date_start);
            i.end = Date.parse(i.date_end);
            return i;
          } else {
            i.title = i.type + ' - ' + i.id;
            i.url = 'event.html?id=' + i.reservation_id;
            i.class = 'event-important';
            i.start = Date.parse(i.start_time);
            i.end = Date.parse(i.end_time);
            return i;
          }
        });
      }
    });
  }
})
.controller('EventCtrl', function($rootScope, $http, $scope, $cookies) {
  var uri = URI(window.location.href);
  var id = null;

  // Time pickers
  var startTime = $('#starttimepicker').datetimepicker();
  var endTime = $('#endtimepicker').datetimepicker();

  // Default objects
  $scope.reservation = {
    items: []
  };
  $scope.rooms = [];
  $scope.items = [];
  $scope.item_ids = [];

  $scope.isUsed = function(item) {
    var used_items = $scope.reservation.items.map(function(i) { return i.id; });
    var common = used_items.filter(function(n) {
      return $scope.item_ids.indexOf(n) != -1;
    });

    return common.indexOf(item) >= 0;
  };

  // Get all resources
  $http.get('/inventory').then(function(response) {
    console.log(response);
    $scope.resources = response.data.body.resources;

    angular.forEach($scope.resources, function(res) {
      if (res.type == 'Room') $scope.rooms.push(res);
    });

    angular.forEach($scope.resources, function(res) {
      if (res.type != 'Room') {
        $scope.items.push(res);
        $scope.item_ids.push(res.id);
      }
    });
  });

  $scope.reserve = function() {
    console.log();
    $http.post('/inventory/reserve', {
      resourceId: $scope.selected,
      startTime: startTime.val(),
      endTime: endTime.val(),
      user: $rootScope.UID
    }).then(function(response) {
      if (response.data.body.status === 'fail') {
          $scope.error = 'Error adding a reservation';
          // console.log('Could not add a reservation');
          return;
      }
      console.log('I added a new reservation');
      // $window.location.href = '/index.html';
    });
  }

  

  if (uri.hasQuery('id')) {
    id = parseInt(uri.search().split('=')[1]);

    // Retrieve the reservation
    $http.get('/reservations/' + id).then(function(response) {
      $scope.reservation = response.data.body;
      console.log($scope.reservation);
      startTime.data("DateTimePicker").date(new Date(Date.parse($scope.reservation.start_time)));
      endTime.data("DateTimePicker").date(new Date(Date.parse($scope.reservation.end_time)));
    });
  }
});
