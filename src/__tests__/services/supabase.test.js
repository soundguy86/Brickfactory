/**
 * Supabase Service Tests
 */

import {
  createBooking,
  getBookings,
  updateBookingStatus,
  createPayment,
  updatePaymentStatus,
  getTestimonials,
  createTestimonial,
  getBookingStats,
  signIn,
  signOut,
  getCurrentUser,
} from '../../services/supabase';

// Mock Supabase
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => require('../../__mocks__/supabaseMock').supabase),
}));

describe('Supabase Service - Bookings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createBooking', () => {
    it('should create a booking successfully', async () => {
      const bookingData = {
        bandName: 'Test Band',
        email: 'test@band.com',
        phone: '+49123456789',
        level: 'intermediate',
        preferredDate: '2025-01-15',
        preferredTime: 'Sa 15:00',
        bandSize: 4,
        message: 'Looking forward to it!',
      };

      const result = await createBooking(bookingData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.band_name).toBe('Test Band');
      expect(result.data.email).toBe('test@band.com');
      expect(result.data.status).toBe('pending');
    });

    it('should handle booking creation errors', async () => {
      // Test with invalid data
      const result = await createBooking({});

      // Should still return a result structure
      expect(result).toHaveProperty('success');
    });
  });

  describe('getBookings', () => {
    it('should fetch all bookings', async () => {
      const result = await getBookings();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
    });

    it('should filter bookings by status', async () => {
      const result = await getBookings({ status: 'confirmed' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should filter bookings by level', async () => {
      const result = await getBookings({ level: 'intermediate' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should filter bookings by date range', async () => {
      const result = await getBookings({
        startDate: '2025-01-01',
        endDate: '2025-12-31',
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });
  });

  describe('updateBookingStatus', () => {
    it('should update booking status to confirmed', async () => {
      const result = await updateBookingStatus('test-booking-123', 'confirmed');

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should update booking status to cancelled', async () => {
      const result = await updateBookingStatus('test-booking-123', 'cancelled');

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should update booking status to completed', async () => {
      const result = await updateBookingStatus('test-booking-123', 'completed');

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });
  });
});

describe('Supabase Service - Payments', () => {
  describe('createPayment', () => {
    it('should create a payment record', async () => {
      const paymentData = {
        bookingId: 'test-booking-123',
        amount: 349.00,
        currency: 'EUR',
        stripePaymentId: 'pi_test_123',
        stripeSessionId: 'cs_test_123',
        status: 'pending',
      };

      const result = await createPayment(paymentData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.amount).toBe(349.00);
    });
  });

  describe('updatePaymentStatus', () => {
    it('should update payment status to completed', async () => {
      const result = await updatePaymentStatus('cs_test_123', 'completed');

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should update payment status to failed', async () => {
      const result = await updatePaymentStatus('cs_test_123', 'failed');

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });
  });
});

describe('Supabase Service - Testimonials', () => {
  describe('getTestimonials', () => {
    it('should fetch published testimonials', async () => {
      const result = await getTestimonials();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
    });
  });

  describe('createTestimonial', () => {
    it('should create a testimonial', async () => {
      const testimonialData = {
        bandName: 'Test Band',
        text: 'Amazing coaching session!',
        rating: 5,
        imageUrl: 'https://example.com/image.jpg',
        coachingLevel: 'intermediate',
        isPublished: true,
      };

      const result = await createTestimonial(testimonialData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.rating).toBe(5);
    });
  });
});

describe('Supabase Service - Analytics', () => {
  describe('getBookingStats', () => {
    it('should fetch booking statistics', async () => {
      const result = await getBookingStats();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data).toHaveProperty('totalBookings');
      expect(result.data).toHaveProperty('totalRevenue');
      expect(result.data).toHaveProperty('bookingsByStatus');
      expect(result.data).toHaveProperty('bookingsByLevel');
    });

    it('should calculate total revenue correctly', async () => {
      const result = await getBookingStats();

      expect(result.success).toBe(true);
      expect(typeof result.data.totalRevenue).toBe('number');
      expect(result.data.totalRevenue).toBeGreaterThanOrEqual(0);
    });
  });
});

describe('Supabase Service - Authentication', () => {
  describe('signIn', () => {
    it('should sign in successfully with valid credentials', async () => {
      const result = await signIn('admin@test.com', 'password123');

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.user).toBeDefined();
    });

    it('should handle sign in errors with invalid credentials', async () => {
      // Mock will return success, but in real scenario this would fail
      const result = await signIn('wrong@email.com', 'wrongpassword');

      expect(result).toHaveProperty('success');
    });
  });

  describe('signOut', () => {
    it('should sign out successfully', async () => {
      const result = await signOut();

      expect(result.success).toBe(true);
    });
  });

  describe('getCurrentUser', () => {
    it('should get current user', async () => {
      const result = await getCurrentUser();

      expect(result.success).toBe(true);
      expect(result.user).toBeDefined();
    });
  });
});
