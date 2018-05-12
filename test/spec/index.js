import { equal, ok, strictEqual } from 'assert'
import throws from '../../src'
// import context from '../context'

const T = {
  // context,
  'is a function'() {
    equal(typeof throws, 'function')
  },
  async 'should call the error function'() {
    let called = false
    await throws({
      async fn() {
        called = true
        throw new Error('test-error')
      },
    })
    ok(called)
  },
  async 'should throw if function does not throw'() {
    try {
      await throws({
        async fn() { },
      })
      throw new Error('should have thrown')
    } catch ({ message }) {
      equal(message, 'Function should have thrown')
    }
  },
  async 'should assert on error messages'() {
    await throws({
      async fn() {
        throw new Error('test-error')
      },
      message: 'test-error',
    })
  },
  async 'should throw when asserting on error messages'() {
    try {
      await throws({
        async fn() {
          throw new Error('test-error1')
        },
        message: 'test-error',
      })
      throw new Error('should have thrown')
    } catch ({ message }) {
      equal(message, 'test-error1 != test-error')
    }
  },
  async 'should pass when asserting on error message with regular expression'() {
    await throws({
      async fn() {
        throw new Error('test-error')
      },
      message: /test/,
    })
  },
  async 'should throw when asserting on error message with regular expression'() {
    try {
      await throws({
        async fn() {
          throw new Error('test-error')
        },
        message: /test-error-assert/,
      })
      throw new Error('should have thrown')
    } catch ({ message }) {
      equal(message, 'test-error does not match regular expression /test-error-assert/')
    }
  },
  async 'should pass when asserting on error strict equality'() {
    const error = new Error('test-error')
    await throws({
      async fn() {
        throw error
      },
      error,
    })
  },
  async 'should throw when asserting on strict equality'() {
    const error = new Error('test-error')
    try {
      await throws({
        async fn() {
          throw error
        },
        error: new Error('test-error-assert'),
      })
      throw new Error('should have thrown')
    } catch ({ message }) {
      equal(message, 'Error: test-error is not strict equal to Error: test-error-assert.')
    }
  },
  async 'should assert on error code'() {
    await throws({
      async fn() {
        const error = new Error('test-error')
        error.code = 'ENOENT'
        throw error
      },
      code: 'ENOENT',
    })
  },
  async 'should throw when asserting on error code'() {
    try {
      await throws({
        async fn() {
          const error = new Error('test-error')
          error.code = 'ENOENT-actual'
          throw error
        },
        code: 'ENOENT-assert',
      })
      throw new Error('should have thrown')
    } catch ({ message }) {
      equal(message, 'ENOENT-actual != ENOENT-assert')
    }
  },
  async 'should return an error'() {
    const error = new Error('test-error')
    const actual = await throws({
      fn() {
        throw error
      },
      message: 'test-error',
    })
    strictEqual(actual, error)
  },
  async 'should work with sync function'() {
    await throws({
      fn() {
        throw new Error('test-error')
      },
      message: 'test-error',
    })
  },
}

export default T
