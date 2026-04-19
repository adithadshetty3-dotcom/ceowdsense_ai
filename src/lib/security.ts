/**
 * Security Utility Library for CrowdSense AI
 */

export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  // Basic XSS prevention: replace < and >
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const securityConfig = {
  encryptionLevel: 'AES-256-GCM',
  authProvider: 'Google Firebase (MFA Ready)',
  sessionTimeout: '30m',
  dataPrivacyPolicy: 'GDPR Compliant',
};
