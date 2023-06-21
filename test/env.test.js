const { init } = require('../src/env');

test('if the Hello variable exists in process.env', () => {
  init();

  expect(process.env.HELLO).toBe('World');
});
