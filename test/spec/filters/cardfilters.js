'use strict';

describe('Filter: cardfilters', function () {

  // load the filter's module
  beforeEach(module('faeriaDeckbuilderApp'));

  // initialize a new instance of the filter before each test
  var cardfilters;
  beforeEach(inject(function ($filter) {
    cardfilters = $filter('cardfilters');
  }));


});
