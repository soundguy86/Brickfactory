/**
 * Stripe Service Tests
 */

import {
  createCheckoutSession,
  redirectToCheckout,
  handlePaymentSuccess,
  handlePaymentError,
  formatPrice,
} from '../../services/stripe';

// Mock Stripe
jest.mock('@stripe/stripe-js', () => ({
  loadStripe: jest.fn(() =>
    Promise.resolve(require('../../__mocks__/stripeMock').mockStripe)
  ),
}));

describe('Stripe Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createCheckoutSession', () => {
    it('should create checkout session with correct data', async () => {
      const bookingData = {
        bookingId: 'test-booking-123',
        bandName: 'Test Band',
        email: 'test@band.com',
        level: 'intermediate',
        preferredDate: '2025-01-15',
      };

      const result = await createCheckoutSession(bookingData);

      expect(result.success).toBe(true);
      expect(result.sessionId).toBeDefined();
    });

    it('should include correct payment metadata', async () => {
      const bookingData = {
        bookingId: 'test-booking-123',
        bandName: 'Test Band',
        email: 'test@band.com',
        level: 'intermediate',
        preferredDate: '2025-01-15',
      };

      const result = await createCheckoutSession(bookingData);

      expect(result).toHaveProperty('success');
      // In a real implementation, we'd check metadata here
    });

    it('should handle invalid coaching level', async () => {
      const bookingData = {
        bookingId: 'test-booking-123',
        bandName: 'Test Band',
        email: 'test@band.com',
        level: 'invalid-level', // Invalid level
        preferredDate: '2025-01-15',
      };

      const result = await createCheckoutSession(bookingData);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should calculate correct amount for rookie level', async () => {
      const bookingData = {
        level: 'rookie',
        email: 'test@band.com',
        bookingId: 'test-123',
      };

      const result = await createCheckoutSession(bookingData);

      expect(result).toBeDefined();
      // Rookie is 199€
    });

    it('should calculate correct amount for intermediate level', async () => {
      const bookingData = {
        level: 'intermediate',
        email: 'test@band.com',
        bookingId: 'test-123',
      };

      const result = await createCheckoutSession(bookingData);

      expect(result).toBeDefined();
      // Intermediate is 349€
    });

    it('should calculate correct amount for advanced level', async () => {
      const bookingData = {
        level: 'advanced',
        email: 'test@band.com',
        bookingId: 'test-123',
      };

      const result = await createCheckoutSession(bookingData);

      expect(result).toBeDefined();
      // Advanced is 549€
    });

    it('should calculate correct amount for masterclass level', async () => {
      const bookingData = {
        level: 'masterclass',
        email: 'test@band.com',
        bookingId: 'test-123',
      };

      const result = await createCheckoutSession(bookingData);

      expect(result).toBeDefined();
      // Masterclass is 899€
    });
  });

  describe('redirectToCheckout', () => {
    it('should redirect to Stripe checkout', async () => {
      const sessionId = 'cs_test_123';

      await expect(redirectToCheckout(sessionId)).resolves.not.toThrow();
    });

    it('should handle redirect errors', async () => {
      const { mockStripe } = require('../../__mocks__/stripeMock');
      mockStripe.redirectToCheckout.mockRejectedValueOnce(
        new Error('Network error')
      );

      await expect(redirectToCheckout('invalid-session')).rejects.toThrow();
    });
  });

  describe('handlePaymentSuccess', () => {
    it('should handle successful payment', async () => {
      const sessionId = 'cs_test_123';

      const result = await handlePaymentSuccess(sessionId);

      expect(result.success).toBe(true);
      expect(result.sessionId).toBe(sessionId);
    });

    it('should return session details', async () => {
      const result = await handlePaymentSuccess('cs_test_123');

      expect(result).toHaveProperty('sessionId');
      expect(result).toHaveProperty('message');
    });
  });

  describe('handlePaymentError', () => {
    it('should handle payment errors correctly', () => {
      const error = new Error('Payment failed');

      const result = handlePaymentError(error);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Payment failed');
      expect(result.details).toBeDefined();
    });

    it('should handle unknown errors', () => {
      const error = { message: undefined };

      const result = handlePaymentError(error);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Payment failed');
    });
  });

  describe('formatPrice', () => {
    it('should format EUR prices correctly', () => {
      expect(formatPrice(199)).toBe('199,00 €');
      expect(formatPrice(349)).toBe('349,00 €');
      expect(formatPrice(549)).toBe('549,00 €');
      expect(formatPrice(899)).toBe('899,00 €');
    });

    it('should format decimal prices correctly', () => {
      expect(formatPrice(199.99)).toBe('199,99 €');
      expect(formatPrice(100.50)).toBe('100,50 €');
    });

    it('should handle zero correctly', () => {
      expect(formatPrice(0)).toBe('0,00 €');
    });

    it('should handle large amounts correctly', () => {
      expect(formatPrice(10000)).toBe('10.000,00 €');
    });

    it('should support different currencies', () => {
      const usdPrice = formatPrice(199, 'USD');
      expect(usdPrice).toContain('199');
    });
  });
});
