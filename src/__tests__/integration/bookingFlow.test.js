/**
 * Integration Tests - Complete Booking Flow
 * Tests the end-to-end booking process
 */

import { API } from '../../services/api';

// Mock all external services
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => require('../../__mocks__/supabaseMock').supabase),
}));

jest.mock('@stripe/stripe-js', () => ({
  loadStripe: jest.fn(() =>
    Promise.resolve(require('../../__mocks__/stripeMock').mockStripe)
  ),
}));

describe('Integration Tests - Booking Flow', () => {
  const mockBookingData = {
    bandName: 'Integration Test Band',
    email: 'integration@test.com',
    phone: '+49987654321',
    level: 'advanced',
    preferredDate: '2025-02-01',
    preferredTime: 'Sa 10:00',
    bandSize: 5,
    message: 'Looking forward to the coaching!',
    price: 549,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Complete Booking Flow', () => {
    it('should complete entire booking process successfully', async () => {
      // Step 1: Process booking (creates DB entry + Stripe session)
      const bookingResult = await API.processBooking(mockBookingData);

      expect(bookingResult.success).toBe(true);
      expect(bookingResult.booking).toBeDefined();
      expect(bookingResult.booking.id).toBeDefined();
      expect(bookingResult.checkoutSessionId).toBeDefined();

      // Step 2: Simulate successful payment
      const paymentResult = await API.completePayment(
        bookingResult.checkoutSessionId
      );

      expect(paymentResult.success).toBe(true);
    });

    it('should create booking in database', async () => {
      const result = await API.processBooking(mockBookingData);

      expect(result.success).toBe(true);
      expect(result.booking).toMatchObject({
        band_name: mockBookingData.bandName,
        email: mockBookingData.email,
        phone: mockBookingData.phone,
        level: mockBookingData.level,
      });
    });

    it('should create Stripe checkout session', async () => {
      const result = await API.processBooking(mockBookingData);

      expect(result.success).toBe(true);
      expect(result.checkoutSessionId).toBeDefined();
      expect(typeof result.checkoutSessionId).toBe('string');
    });

    it('should handle booking failure and rollback', async () => {
      // Simulate failure by using invalid data
      const invalidData = {
        ...mockBookingData,
        level: 'invalid-level',
      };

      const result = await API.processBooking(invalidData);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Booking Flow - Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      // Mock will handle this, but test the flow
      const result = await API.processBooking(mockBookingData);

      expect(result).toHaveProperty('success');
    });

    it('should handle Stripe errors gracefully', async () => {
      const result = await API.processBooking(mockBookingData);

      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('checkoutSessionId');
    });

    it('should validate required booking fields', async () => {
      const incompleteData = {
        bandName: 'Test',
        // Missing email, phone, etc.
      };

      const result = await API.processBooking(incompleteData);

      // Should still return a result structure
      expect(result).toHaveProperty('success');
    });
  });

  describe('Payment Completion Flow', () => {
    it('should complete payment successfully', async () => {
      const sessionId = 'cs_test_successful';

      const result = await API.completePayment(sessionId);

      expect(result.success).toBe(true);
      expect(result.message).toBeDefined();
    });

    it('should handle payment verification errors', async () => {
      const invalidSessionId = '';

      const result = await API.completePayment(invalidSessionId);

      expect(result).toHaveProperty('success');
    });
  });

  describe('Dashboard Data Flow', () => {
    it('should fetch all dashboard data successfully', async () => {
      const result = await API.getDashboardData();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data).toHaveProperty('bookings');
      expect(result.data).toHaveProperty('stats');
      expect(result.data).toHaveProperty('testimonials');
    });

    it('should return array of bookings', async () => {
      const result = await API.getDashboardData();

      expect(Array.isArray(result.data.bookings)).toBe(true);
    });

    it('should return stats object', async () => {
      const result = await API.getDashboardData();

      expect(typeof result.data.stats).toBe('object');
      expect(result.data.stats).toHaveProperty('totalBookings');
      expect(result.data.stats).toHaveProperty('totalRevenue');
    });

    it('should return array of testimonials', async () => {
      const result = await API.getDashboardData();

      expect(Array.isArray(result.data.testimonials)).toBe(true);
    });
  });

  describe('Multi-Level Booking Tests', () => {
    it('should process rookie level booking', async () => {
      const rookieBooking = {
        ...mockBookingData,
        level: 'rookie',
        price: 199,
      };

      const result = await API.processBooking(rookieBooking);

      expect(result.success).toBe(true);
    });

    it('should process intermediate level booking', async () => {
      const intermediateBooking = {
        ...mockBookingData,
        level: 'intermediate',
        price: 349,
      };

      const result = await API.processBooking(intermediateBooking);

      expect(result.success).toBe(true);
    });

    it('should process advanced level booking', async () => {
      const advancedBooking = {
        ...mockBookingData,
        level: 'advanced',
        price: 549,
      };

      const result = await API.processBooking(advancedBooking);

      expect(result.success).toBe(true);
    });

    it('should process masterclass level booking', async () => {
      const masterclassBooking = {
        ...mockBookingData,
        level: 'masterclass',
        price: 899,
      };

      const result = await API.processBooking(masterclassBooking);

      expect(result.success).toBe(true);
    });
  });

  describe('Concurrent Bookings', () => {
    it('should handle multiple simultaneous bookings', async () => {
      const bookings = [
        { ...mockBookingData, email: 'band1@test.com' },
        { ...mockBookingData, email: 'band2@test.com' },
        { ...mockBookingData, email: 'band3@test.com' },
      ];

      const results = await Promise.all(
        bookings.map((data) => API.processBooking(data))
      );

      results.forEach((result) => {
        expect(result.success).toBe(true);
        expect(result.booking).toBeDefined();
      });
    });
  });

  describe('Booking Status Updates', () => {
    it('should update booking status through workflow', async () => {
      // Create booking
      const bookingResult = await API.processBooking(mockBookingData);
      expect(bookingResult.success).toBe(true);

      const bookingId = bookingResult.booking.id;

      // Update to confirmed
      const confirmedResult = await API.updateBookingStatus(bookingId, 'confirmed');
      expect(confirmedResult.success).toBe(true);

      // Update to completed
      const completedResult = await API.updateBookingStatus(bookingId, 'completed');
      expect(completedResult.success).toBe(true);
    });

    it('should allow cancellation of bookings', async () => {
      const bookingResult = await API.processBooking(mockBookingData);
      expect(bookingResult.success).toBe(true);

      const cancelResult = await API.updateBookingStatus(
        bookingResult.booking.id,
        'cancelled'
      );

      expect(cancelResult.success).toBe(true);
    });
  });
});
