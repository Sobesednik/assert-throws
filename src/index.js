import erte from 'erte'
import erotic from 'erotic'

const equal = (a, b) => {
  if (a != b) {
    const e = erte(a, b)
    const msg = `${a} != ${b}`
    const er = new Error(`${e}\n${msg}`) //
    throw er
  }
}

const matchString = (errorMessage, m) => {
  equal(errorMessage, m)
}

const assertRe = (actual, re) => {
  const res = re.test(actual)
  if (!res) {
    throw new Error(`${actual} does not match regular expression ${re}`)
  }
}

function assertMessage({ message: errorMessage }, message) {
  if (message instanceof RegExp) {
    assertRe(errorMessage, message)
  } else if (message) {
    matchString(errorMessage, message)
  }
}

function assertCode({ code: errorCode }, code) {
  if (code instanceof RegExp) {
    assertRe(errorCode, code)
  } else if (code) {
    matchString(errorCode, code)
  }
}

function assertStack({ stack: errorStack }, stack) {
  if (stack instanceof RegExp) {
    assertRe(errorStack, stack)
  } else if (stack) {
    matchString(errorStack, stack)
  }
}

const shouldHaveThrownError = new Error('Function should have thrown')

/**
 * Assert that a function throws.
 * @param {object} config
 * @param {function} config.fn Function to test, either sync or async
 * @param {any[]} [config.args] Arguments to pass to the function
 * @param {string|RegExp} [config.message] Message to test against
 * @param {string} [config.code] Code to test against
 * @param {Error} [config.error] An error to perform strict comparison against.
 * @param {object} [config.context] Context in which to execute the function,
 * global context by default
 */
export default async function assertThrows(config) {
  const e = erotic(true)
  const {
    fn, message, code, stack, args = [], context = null, error,
  } = config
  if (typeof fn != 'function') throw new Error('function expected')
  const isMessageRe = message instanceof RegExp
  if (message && !isMessageRe && typeof message !== 'string') {
    throw new Error('please pass an error message as a string or regular expression')
  }

  try {
    await fn.call(context, ...args)
    throw shouldHaveThrownError
  } catch (err) {
    if (err === shouldHaveThrownError) {
      throw e(err)
    }
    if (error && error !== err) {
      throw e(`${err} is not strict equal to ${error}.`)
    }
    try {
      assertMessage(err, message)
      assertCode(err, code)
      assertStack(err, stack)
    } catch ({ message }) {
      throw e(message)
    }
    return e(err)
  }
}
