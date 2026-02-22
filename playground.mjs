import { requireEnv } from './dist/index.mjs';

try {
  process.env.TEST_ESM = 'true';
  const { TEST_ESM } = requireEnv(['TEST_ESM']);
  if (TEST_ESM === 'true') {
    console.log('ESM Success!');
  } else {
    console.error('ESM Failed: Value mismatch');
    process.exit(1);
  }
} catch (error) {
  console.error('ESM Failed:', error);
  process.exit(1);
}
