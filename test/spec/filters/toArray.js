'use strict';

describe('Filter: toArray', function () {

  // load the filter's module
  beforeEach(module('faeriaDeckbuilderApp'));

  // initialize a new instance of the filter before each test
  var toArray;
  beforeEach(inject(function ($filter) {
    toArray = $filter('toArray');
  }));


});
