var assert = require('assert');
var context = require('../context/');
var assertThrows = require('../../src/');

var equal = assert.equal;


var assertThrowsTestSuite = {
    context,

    'should be a function': function shouldBeAFunction() {
        assert.equal(typeof assertThrows, 'function');
    },
    'should call the error function'() {
        return new Promise(function ($return, $error) {
            var called;

            called = false;
            return Promise.resolve(assertThrows({
                fn() {
                    return new Promise(function ($return, $error) {
                        called = true;
                        return $error(new Error('test-error'));
                    }.bind(this));
                }
            })).then(function ($await_4) {
                try {
                    assert(called);
                    return $return();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this), $error);
        }.bind(this));
    },
    'should throw if function does not throw'() {
        return new Promise(function ($return, $error) {
            var message;
            var $Try_1_Post = function () {
                try {
                    return $return();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this);var $Try_1_Catch = function (_ref) {
                try {
                    message = _ref.message;

                    equal(message, 'Function should have thrown');
                    return $Try_1_Post();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this);
            try {
                return Promise.resolve(assertThrows({
                    fn() {
                        return new Promise(function ($return, $error) {
                            return $return();
                        }.bind(this));
                    }
                })).then(function ($await_5) {
                    try {
                        throw new Error('should have thrown');
                    } catch ($boundEx) {
                        return $Try_1_Catch($boundEx);
                    }
                }.bind(this), $Try_1_Catch);
            } catch (_ref) {
                $Try_1_Catch(_ref)
            }
        }.bind(this));
    },
    'should assert on error messages'() {
        return new Promise(function ($return, $error) {
            return Promise.resolve(assertThrows({
                fn() {
                    return new Promise(function ($return, $error) {
                        return $error(new Error('test-error'));
                    }.bind(this));
                },
                message: 'test-error'
            })).then(function ($await_6) {
                try {
                    return $return();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this), $error);
        }.bind(this));
    },
    'should throw when asserting on error messages'() {
        return new Promise(function ($return, $error) {
            var message;
            var $Try_2_Post = function () {
                try {
                    return $return();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this);var $Try_2_Catch = function (_ref2) {
                try {
                    message = _ref2.message;

                    equal(message, 'test-error1 != test-error');
                    return $Try_2_Post();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this);
            try {
                return Promise.resolve(assertThrows({
                    fn() {
                        return new Promise(function ($return, $error) {
                            return $error(new Error('test-error1'));
                        }.bind(this));
                    },
                    message: 'test-error'
                })).then(function ($await_7) {
                    try {
                        throw new Error('should have thrown');
                    } catch ($boundEx) {
                        return $Try_2_Catch($boundEx);
                    }
                }.bind(this), $Try_2_Catch);
            } catch (_ref2) {
                $Try_2_Catch(_ref2)
            }
        }.bind(this));
    },
    'should assert on error code'() {
        return new Promise(function ($return, $error) {
            return Promise.resolve(assertThrows({
                fn() {
                    return new Promise(function ($return, $error) {
                        var error = new Error('test-error');
                        error.code = 'ENOENT';
                        return $error(error);
                    }.bind(this));
                },
                code: 'ENOENT'
            })).then(function ($await_8) {
                try {
                    return $return();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this), $error);
        }.bind(this));
    },
    'should throw when asserting on error code'() {
        return new Promise(function ($return, $error) {
            var message;
            var $Try_3_Post = function () {
                try {
                    return $return();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this);var $Try_3_Catch = function (_ref3) {
                try {
                    message = _ref3.message;

                    equal(message, 'ENOENT-actual != ENOENT-assert');
                    return $Try_3_Post();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this);
            try {
                return Promise.resolve(assertThrows({
                    fn() {
                        return new Promise(function ($return, $error) {
                            var error = new Error('test-error');
                            error.code = 'ENOENT-actual';
                            return $error(error);
                        }.bind(this));
                    },
                    code: 'ENOENT-assert'
                })).then(function ($await_9) {
                    try {
                        throw new Error('should have thrown');
                    } catch ($boundEx) {
                        return $Try_3_Catch($boundEx);
                    }
                }.bind(this), $Try_3_Catch);
            } catch (_ref3) {
                $Try_3_Catch(_ref3)
            }
        }.bind(this));
    },
    'should work with sync function'() {
        return new Promise(function ($return, $error) {
            return Promise.resolve(assertThrows({
                fn() {
                    throw new Error('test-error');
                },
                message: 'test-error'
            })).then(function ($await_10) {
                try {
                    return $return();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this), $error);
        }.bind(this));
    }
};

module.exports = assertThrowsTestSuite;