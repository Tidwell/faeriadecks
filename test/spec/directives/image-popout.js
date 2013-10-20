'use strict';

describe('Directive: imagePopout', function () {
  beforeEach(module('faeriaDeckbuilderApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<image-popout></image-popout>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the imagePopout directive');
  }));
});
