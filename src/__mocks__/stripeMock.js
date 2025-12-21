/**
 * Mock Stripe for Testing
 */

export const mockStripeSession = {
  id: 'cs_test_123456789',
  object: 'checkout.session',
  amount_total: 34900, // 349.00 EUR in cents
  currency: 'eur',
  customer_email: 'test@band.com',
  payment_status: 'paid',
  status: 'complete',
};

export const mockStripe = {
  redirectToCheckout: jest.fn().mockResolvedValue({ error: null }),
  confirmCardPayment: jest.fn().mockResolvedValue({ error: null }),
};

export const loadStripe = jest.fn().mockResolvedValue(mockStripe);

export default mockStripe;
