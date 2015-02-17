(function () {

  var app = angular.module('khe.controllers', []);

  /**
  * Staff Controller
  */
  app.controller('StaffController', ['$http', '$scope', function ($http, $scope) {
    var _users;
    $scope.all = function () {
      $scope.users = _users;
    };
    $scope.approved = function () {
      $scope.users = _users.filter(function (user) {
        return user.application.status == 'approved';
      });
    };
    $scope.rsvp = function () {
      $scope.users = _users.filter(function (user) {
        return user.application.going;
      });
    };
    $scope.travel = function () {
      $scope.users = _users.filter(function (user) {
        return user.application.travel;
      });
    };

    var config = {
      method: 'GET',
      url: '/users',
      headers: {
        'Authorization': 'Basic ' + base64Encode('paul:test')
      }
    };

    $http(config)
      .success(function (data) {
        _users = data.users;
        $scope.users = _users;
      })
      .error(function (data, status) {
        console.log(status);
        console.log(data);
      });
  }]);

  /**
  * Directives
  */
  app
    .directive('staffheader', function () {
      return {
        templateUrl: '/partials/staff-header.html'
      };
    })
    .directive('staffattendeesidebar', function () {
      return {
        templateUrl: '/partials/staff-attendee-sidebar.html'
      };
    });

})();