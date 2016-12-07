angular.module('erp', ['ngCookies'])
.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
})
.run(function($rootScope, $cookies, $window) {
  $rootScope.UID = $cookies.get('userId');

  $rootScope.logout = function() {
    $cookies.remove('token');
    $cookies.remove('userId');
    $window.location.href = 'login.html';
  };
})
.factory('authInterceptor', function($q, $window) {
  return {
    responseError: function(rejection) {
      if (rejection.status == 403) {
        $window.location.href = 'login.html';
      }

      return $q.reject(rejection);
    }
  };
})
.controller('LoginCtrl', function($cookies, $http, $scope, $window) {
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
      $cookies.put('userId', response.data.body.userId);
      $window.location.href = 'index.html';
    });
  };
})
.controller('CalendarCtrl', function($http, $scope, $rootScope) {
  $scope.currentTime = moment().format("dddd, MMMM Do YYYY, h:mm a");

  $http.get('/users/' + $rootScope.UID).then(function(response) {
    console.log(response);
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
      tmpl_path: "bower_components/bootstrap-calendar/tmpls/",

      onAfterViewLoad: function(view) {
        $scope.title = this.getTitle();
        $scope.currentView = view;
      },

      events_source: function () {
        return data.map(function(i) {
          i.id = i.reservation_id;
          i.class = 'event-important';
          i.start = i.date_start;
          i.end = i.date_end;
          i.url = 'changeEvents.html?id=' + i.reservation_id;

          if (i.type === 'Room') {
            i.title = i.room_type.charAt(0).toUpperCase() + i.room_type.slice(1) + ' - ' + i.room_number;
          } else {
            i.title = i.type + ' - #' + i.resource_id;
          }

          return i;
        });
      }
    });
  }
})
.controller('PasswordCtrl', function($http, $scope, $rootScope, $window) {
  $scope.changePass = function() {
    if (!$scope.password) {
      $scope.error = 'Please enter both username and password';
    }

    $http.post('/users/' + $rootScope.UID, {
      user: {
        user_password: $scope.password
      }
    }).then(function(response) {
      if (response.data.status === false) {
        $scope.error = "Who cares it's gonna pass";
        return;
      }

      // Redirect to reservations
      $window.location.href = 'index.html';
    });
  };
})
.controller('EventCtrl', function($rootScope, $http, $scope, $window, $q) {
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
  $scope.itemsSelected = [];
  $scope.roomsSelected = null;

  $scope.isUsed = function(item) {
    var used_items = $scope.reservation.items.map(function(i) { return i.id; });
    var common = used_items.filter(function(n) {
      return $scope.item_ids.indexOf(n) != -1;
    });

    return common.indexOf(item) >= 0;
  };

  // Get all resources
  $http.get('/inventory').then(function(response) {
    $scope.resources = response.data.body.resources;

    angular.forEach($scope.resources, function(res) {
      if (res.type == 'Room') $scope.rooms.push(res);
    });

    angular.forEach($scope.resources, function(res) {
      if (res.type != 'Room') {
        $scope.items.push(res);
        $scope.item_ids.push(res.resource_id);
      }
    });
  });

  $scope.reserve = function() {
    var resourceList = $scope.itemsSelected;
    if ($scope.roomsSelected !== null) {
      resourceList.push($scope.roomsSelected);
    }

    resourceList.map(function(r) {
      return $http.post('/inventory/reserve', {
        resource_id: parseInt(r),
        date_start: startTime.val(),
        date_end: endTime.val(),
        user_id: $rootScope.UID
      });
    });

    $q.all(resourceList).then(function() {
      $window.location.href = 'index.html';
    });
  }

  if (uri.hasQuery('id')) {
    id = parseInt(uri.search().split('=')[1]);

    // Retrieve the reservation
    $http.get('/reservations/' + id).then(function(response) {
      $scope.reservation = response.data.body.reservation;
      $scope.reservation.start = new Date($scope.reservation.start_date);
      $scope.reservation.end = new Date($scope.reservation.end_date);
      // startTime.data("DateTimePicker").date(new Date(Date.parse($scope.reservation.start_time)));
      // endTime.data("DateTimePicker").date(new Date(Date.parse($scope.reservation.end_time)));

    });
  }
})
.controller('ChangeCtrl', function($http, $scope, $rootScope, $window) {
  var uri = URI(window.location.href);

  $scope.items = [];
  $scope.rooms = [];

  if (uri.hasQuery('id')) {
    id = parseInt(uri.search().split('=')[1]);

    // Retrieve the reservation
    $http.get('/reservations/' + id).then(function(response) {
      console.log(response);
      $scope.reservation = response.data.body;
      $scope.reservation.start = new Date($scope.reservation.reservation.start_date);
      $scope.reservation.end = new Date($scope.reservation.reservation.end_date);
      $scope.reservation.type = $scope.reservation.reservation.type;
      $scope.reservation.reservation_id = $scope.reservation.reservation.reservation_id;
      $scope.reservation.resource_id = $scope.reservation.reservation.resource_id;

      angular.forEach($scope.reservation.reservation, function(res) {
        if (res.type == 'Room') $scope.rooms.push(res);
      });

      angular.forEach($scope.reservation.reservation, function(res) {
        if (res.type != 'Room') {
          $scope.items.push(res);
          $scope.item_ids.push(res.resource_id);
        }
      });
      // startTime.data("DateTimePicker").date(new Date(Date.parse($scope.reservation.start_time)));
      // endTime.data("DateTimePicker").date(new Date(Date.parse($scope.reservation.end_time)));

    });

    $scope.cancelReservation = function() {
      console.log($scope);

      $http.post('/inventory/cancel', {
        reservation_id: $scope.reservation.reservation_id,
        resource_id: $scope.reservation.resource_id
      }).then(function(response) {
        if (response.data.body.status === 'fail') {
            $scope.error = 'Error adding rooms and items';
            return;
          }
          $window.location.href='index.html';
      });

    };
  }
});




