/**
 * Ensures required environment variables exist, failing fast if they are missing.
 * @param required Array of required environment variable names.
 * @param defaults Optional object containing default values for environment variables.
 * @returns An object containing the values of the required environment variables and defaults.
 * @throws Error if any required environment variables are missing.
 */
export function requireEnv<K extends string>(
  required: K[],
  defaults?: Record<string, string | number | boolean>
): Record<K, string> & (typeof defaults extends undefined ? {} : typeof defaults) {
  const missing: string[] = [];
  const result: any = {};

  // Check required variables
  for (const key of required) {
    const value = process.env[key];
    if (value === undefined || value === '') {
      missing.push(key);
    } else {
      result[key] = value;
    }
  }

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // Apply defaults
  if (defaults) {
    for (const key of Object.keys(defaults)) {
      const value = process.env[key];
      // Use env value if present, otherwise use default
      if (value !== undefined && value !== '') {
        result[key] = value;
      } else {
        result[key] = defaults[key];
      }
    }
  }

  return result;
}

export default requireEnv;
