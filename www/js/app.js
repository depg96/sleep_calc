angular.module('app', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('SleepCalcCtrl', ['$scope', '$window', '$timeout', 'SleepCalcServ', function($scope, $window, $timeout, SleepCalcServ) {
  $timeout(function() {
    update();
  });

  var update = function() {
    $scope.naps = SleepCalcServ.all();
    $scope.state = SleepCalcServ.get();
  };

  $scope.toggle = function() {
    if($scope.state === 'awake') {
      SleepCalcServ.set();
    }
    else {
      SleepCalcServ.reset();
    }
    update();
  };

  $scope.clear = function() {
    SleepCalcServ.clear();
    update();
  };
}])

.service('SleepCalcServ',['$window', function($window) {
  var sleepy = JSON.parse($window.localStorage.sleepy || '{"state":"awake","nap":{"t_sleep":"","t_nap":""},"naps":[]}');

  this.all = function() {
    return sleepy.naps;
  };

  this.get = function() {
    return sleepy.state;
  };

  this.set = function() {
    sleepy.state = 'sleeping...';
    sleepy.nap.t_sleep = Date.now();
    $window.localStorage.sleepy = JSON.stringify(sleepy);
  };

  this.reset = function() {
    sleepy.nap.t_nap = (Date.now() - sleepy.nap.t_sleep);
    sleepy.state = 'awake';
    sleepy.naps.push(sleepy.nap);
    sleepy.nap = { t_sleep: '', t_nap: '' };
    $window.localStorage.sleepy = JSON.stringify(sleepy);
  };

  this.clear = function() {
    sleepy.naps = [];
    $window.localStorage.sleepy = JSON.stringify(sleepy);
  };
}])

.filter('millisecond', function() {
  return function(ms) {
    seconds = Math.round((ms/1000)%60).toString();
    minutes = Math.floor((ms/60000)%60).toString();
    hours = Math.floor(ms/3600000).toString();
    if(parseInt(seconds) < 10) {
      seconds = '0' + seconds;
    }
    if(parseInt(minutes) < 10) {
      minutes = '0' + minutes;
    }
    if(parseInt(hours) < 10) {
      hours = '0' + hours;
    }
    return hours + ':' + minutes + ':' + seconds;
  };
});
