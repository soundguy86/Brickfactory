/**
 * Mock Supabase Client for Testing
 */

export const mockBooking = {
  id: 'test-booking-123',
  band_name: 'Test Band',
  email: 'test@band.com',
  phone: '+49123456789',
  level: 'intermediate',
  preferred_date: '2025-01-15',
  preferred_time: 'Sa 15:00',
  status: 'pending',
  created_at: new Date().toISOString(),
};

export const mockUser = {
  id: 'test-user-123',
  email: 'admin@test.com',
  auth_id: 'auth-123',
  role: 'admin',
};

export const mockTestimonial = {
  id: 'test-testimonial-123',
  band_name: 'Test Band',
  text: 'Great coaching!',
  rating: 5,
  is_published: true,
};

export const mockPayment = {
  id: 'test-payment-123',
  booking_id: 'test-booking-123',
  amount: 349.00,
  currency: 'EUR',
  stripe_session_id: 'cs_test_123',
  status: 'completed',
};

// Mock Supabase response structure
const createMockResponse = (data, error = null) => ({
  data,
  error,
  count: data ? (Array.isArray(data) ? data.length : 1) : 0,
  status: error ? 400 : 200,
  statusText: error ? 'Bad Request' : 'OK',
});

// Mock query builder
class MockQueryBuilder {
  constructor(data, error = null) {
    this.mockData = data;
    this.mockError = error;
    this.filters = {};
  }

  select(columns = '*') {
    return this;
  }

  insert(values) {
    this.mockData = Array.isArray(values) ? values : [values];
    return this;
  }

  update(values) {
    if (this.mockData) {
      this.mockData = { ...this.mockData, ...values };
    }
    return this;
  }

  delete() {
    return this;
  }

  eq(column, value) {
    this.filters[column] = value;
    return this;
  }

  gte(column, value) {
    this.filters[`${column}_gte`] = value;
    return this;
  }

  lte(column, value) {
    this.filters[`${column}_lte`] = value;
    return this;
  }

  order(column, options) {
    return this;
  }

  limit(count) {
    return this;
  }

  single() {
    return Promise.resolve(
      createMockResponse(
        Array.isArray(this.mockData) ? this.mockData[0] : this.mockData,
        this.mockError
      )
    );
  }

  then(resolve) {
    return Promise.resolve(
      createMockResponse(this.mockData, this.mockError)
    ).then(resolve);
  }

  catch(reject) {
    return Promise.resolve(
      createMockResponse(this.mockData, this.mockError)
    ).catch(reject);
  }
}

// Mock Supabase client
export const createMockSupabaseClient = (options = {}) => ({
  from: (table) => {
    const { returnError, data } = options;

    let mockData = null;
    if (table === 'bookings') mockData = data || [mockBooking];
    if (table === 'users') mockData = data || [mockUser];
    if (table === 'testimonials') mockData = data || [mockTestimonial];
    if (table === 'payments') mockData = data || [mockPayment];

    return new MockQueryBuilder(mockData, returnError ? new Error('Mock error') : null);
  },

  auth: {
    signInWithPassword: jest.fn().mockResolvedValue({
      data: { user: mockUser, session: { access_token: 'mock-token' } },
      error: null,
    }),
    signOut: jest.fn().mockResolvedValue({ error: null }),
    getUser: jest.fn().mockResolvedValue({
      data: { user: mockUser },
      error: null,
    }),
  },
});

// Export mock instance
export const supabase = createMockSupabaseClient();
