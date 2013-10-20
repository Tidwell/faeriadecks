'use strict';

describe('Controller: CardlistCtrl', function () {

  // load the controller's module
  beforeEach(module('faeriaDeckbuilderApp'));

  var CardlistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CardlistCtrl = $controller('CardlistCtrl', {
      $scope: scope
    });
  }));

});
