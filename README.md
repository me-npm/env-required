# env-required

Ensures required environment variables exist, failing fast at startup if they are missing.

## Features

- ✅ **Fail Fast**: Throws clear errors if required environment variables are missing.
- ✅ **Type Safe**: Returns a typed object with your environment variables.
- ✅ **Defaults**: Supports default values for optional variables.
- ✅ **Zero Dependencies**: Lightweight and fast.
- ✅ **Dual Support**: Works with both **ES Modules (ESM)** and **CommonJS (CJS)**.

## Installation

```bash
npm install env-required
```

## Usage

### Basic Usage

Require specific environment variables. If any are missing from `process.env`, `requireEnv` throws an error.

```typescript
import { requireEnv } from 'env-required';

try {
  const { DB_URL, JWT_SECRET } = requireEnv([
    'DB_URL',
    'JWT_SECRET',
  ]);
  
  console.log('Connected to:', DB_URL);
} catch (error) {
  // Error: Missing required environment variables: DB_URL, JWT_SECRET
  console.error(error.message);
  process.exit(1);
}
```

### With Default Values

You can provide a second argument with default values. If an environment variable is missing but has a default, it will use the default instead of throwing.

```typescript
import { requireEnv } from 'env-required';

const { PORT, NODE_ENV } = requireEnv(
  ['NODE_ENV'], // Required
  { PORT: '3000' } // Optional with default
);

// If PORT is not in env, it validates successfully and returns '3000'
console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
```

### CommonJS (require)

```javascript
const { requireEnv } = require('env-required');

const { API_KEY } = requireEnv(['API_KEY']);
```

## API

### `requireEnv<K>(required: K[], defaults?: Record<string, any>): Record<K, string> & Defaults`

- **required**: Array of strings representing required environment variable names.
- **defaults**: (Optional) Object mapping variable names to default values.
- **Returns**: An object containing all requested variables (from env or defaults).
- **Throws**: `Error` if any variable in `required` is missing from `process.env`.

## License

MIT

---

**Author:** [Ahmer Arain](https://ahmerarain.com/)
# env-required
