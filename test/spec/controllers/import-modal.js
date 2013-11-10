'use strict';

describe('Controller: ImportModalCtrl', function () {

  // load the controller's module
  beforeEach(module('faeriadecksApp'));

  var ImportModalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ImportModalCtrl = $controller('ImportModalCtrl', {
      $scope: scope
    });
  }));

});
