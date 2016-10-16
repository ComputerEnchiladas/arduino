angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.turnOn = function( color ) {
    switch( color ) {
      case 'red':
        socket.emit('event:led:red');
        break;
      case 'green':
        socket.emit('event:led:green');
        break;
      case 'blue':
        socket.emit('event:led:blue');
        break;
      case 'white':
        socket.emit('event:led:white');
        break;
      case 'yellow':
        socket.emit('event:led:yellow');
        break;
      default:
        socket.emit('event:leds:off');
        break;
    }
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
