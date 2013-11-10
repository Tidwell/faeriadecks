'use strict';

describe('Controller: ExportModalCtrl', function () {

  // load the controller's module
  beforeEach(module('faeriadecksApp'));

  var ExportModalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExportModalCtrl = $controller('ExportModalCtrl', {
      $scope: scope
    });
  }));

  
});
