import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { requireEnv } from './index';

describe('requireEnv', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return required variables when they exist', () => {
    process.env.TEST_VAR = 'value';
    const env = requireEnv(['TEST_VAR']);
    expect(env.TEST_VAR).toBe('value');
  });

  it('should throw error when required variable is missing', () => {
    delete process.env.TEST_VAR;
    expect(() => requireEnv(['TEST_VAR'])).toThrow('Missing required environment variables: TEST_VAR');
  });

  it('should throw error when multiple required variables are missing', () => {
    delete process.env.VAR1;
    delete process.env.VAR2;
    expect(() => requireEnv(['VAR1', 'VAR2'])).toThrow('Missing required environment variables: VAR1, VAR2');
  });

  it('should use default value when env var is missing', () => {
    const defaults = { DEFAULT_VAR: 'default' };
    const env = requireEnv([], defaults);
    expect(env.DEFAULT_VAR).toBe('default');
  });

  it('should override default value when env var exists', () => {
    process.env.DEFAULT_VAR = 'overridden';
    const defaults = { DEFAULT_VAR: 'default' };
    const env = requireEnv([], defaults);
    expect(env.DEFAULT_VAR).toBe('overridden');
  });

  it('should work with both required and default variables', () => {
    process.env.REQ_VAR = 'required';
    const defaults = { DEF_VAR: 'default' };
    const env = requireEnv(['REQ_VAR'], defaults);
    
    expect(env.REQ_VAR).toBe('required');
    expect(env.DEF_VAR).toBe('default');
  });
});
