'use strict';

describe('Service: skipReload', function () {

  // load the service's module
  beforeEach(module('faeriaDeckbuilderApp'));

  // instantiate service
  var skipReload;
  beforeEach(inject(function (_skipReload_) {
    skipReload = _skipReload_;
  }));

  it('should do something', function () {
    expect(!!skipReload).toBe(true);
  });

});
