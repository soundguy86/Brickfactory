// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';

// Mock environment variables for tests
process.env.REACT_APP_SUPABASE_URL = 'https://test.supabase.co';
process.env.REACT_APP_SUPABASE_ANON_KEY = 'test-anon-key';
process.env.REACT_APP_STRIPE_PUBLIC_KEY = 'pk_test_123456';
process.env.REACT_APP_SENDGRID_API_KEY = 'SG.test-key';
process.env.REACT_APP_ADMIN_EMAIL = 'admin@test.com';
process.env.REACT_APP_SUPPORT_EMAIL = 'support@test.com';

// Suppress console errors in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
        args[0].includes('Not implemented: HTMLFormElement.prototype.submit'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
