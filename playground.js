const { requireEnv } = require('./dist/index.js');

try {
  process.env.TEST_CJS = 'true';
  const { TEST_CJS } = requireEnv(['TEST_CJS']);
  if (TEST_CJS === 'true') {
    console.log('CJS Success!');
  } else {
    console.error('CJS Failed: Value mismatch');
    process.exit(1);
  }
} catch (error) {
  console.error('CJS Failed:', error);
  process.exit(1);
}
