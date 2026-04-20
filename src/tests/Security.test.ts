import { describe, it, expect } from 'vitest';
import { sanitizeInput, validateEmail } from '../lib/security';

describe('Security Logic', () => {
  it('sanitizes malicious inputs', () => {
    const input = '<script>alert("hack")</script>Hello & welcome';
    const output = sanitizeInput(input);
    expect(output).not.toContain('<script>');
    expect(output).toContain('Hello & welcome');
  });

  it('validates email correctly', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('user@domain.co.in')).toBe(true);
  });
});
