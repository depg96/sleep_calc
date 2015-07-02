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

.controller('SleepCalcCtrl', ['$scope', function($scope) {
  $scope.state = 'awake';
  var naps = [];
  naps.push({ t_awake: '', t_sleep: '' });
  naps[0].t_sleep = new Date(2015,6,1,7,30);
  naps[0].t_awake = new Date(2015,6,1,15,30);

  $scope.toggle = function() {
    if(naps[naps.length-1].t_awake !== '') {
      naps.push({ t_sleep: '', t_awake: '' });
    }

    if($scope.state === 'awake') {
       naps[naps.length-1].t_sleep = new Date();
      $scope.state = 'sleeping...';
    }
    else {
      naps[naps.length-1].t_awake = new Date();
      $scope.state = 'awake';
    }
  };
}]);
