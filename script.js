
//your JS code here. If required.
// Define a variable to store the current test suite name
let currentTestSuiteName = '';

// Define a variable to track whether an error occurred
let errorOccurred = false;

// Helper function to throw an error with the given message
function throwError(message) {
  console.error(message);
  throw new Error(message);
}

// The describe function
function describe(testSuiteName, callback) {
  currentTestSuiteName = testSuiteName;
  console.log(`beginning test suite ${testSuiteName}`);
  callback();
  if (!errorOccurred) {
    console.log(`successfully completed test suite ${testSuiteName}`);
  }
}

// The it function
function it(testCaseName, callback) {
  console.log(`beginning test case ${testCaseName}`);
  try {
    callback();
    console.log(`successfully completed test case ${testCaseName}`);
  } catch (error) {
    errorOccurred = true;
    console.error(`failed running test suite ${currentTestSuiteName} on test case ${testCaseName} with error message ${error.message}`);
  }
}

// The expect function
function expect(actual) {
  return {
    toExist() {
      if (actual === null || actual === undefined) {
        throwError(`expected value to exist but got ${JSON.stringify(actual)}`);
      }
    },
    toBe(expected) {
      if (actual !== expected) {
        throwError(`expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`);
      }
    },
    toBeType(type) {
      const typeOfActual = typeof actual;
      if (typeOfActual !== type) {
        throwError(`expected ${JSON.stringify(actual)} to be of type ${type} but got ${typeOfActual}`);
      }
    }
  };
}

// Sample Usage #1
describe('Passing Test Suite', () => {
  it('Passing Test Case #1', () => {
    expect('foo').toExist();
    expect(1 + 1).toBe(2);
  });
  it('Passing Test Case #2', () => {
    expect({}).toBeType('object');
  });
});

// Sample Usage #2
describe('Failing Test Suite', () => {
  it('Passing Test Case', () => {
    expect(0).toBe(0);
  });
  it('Failing Test Case', () => {
    expect(true).toBe(true);
    expect(true).toBe(false);
  });
  it('Unreachable Test Case', () => {
    expect('foo').toBe('bar');
  });
});