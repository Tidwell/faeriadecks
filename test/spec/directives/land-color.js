'use strict';

describe('Directive: landColor', function () {
  beforeEach(module('faeriaDeckbuilderApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<land-color></land-color>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the landColor directive');
  }));
});
