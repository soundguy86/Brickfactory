import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Please add REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY to your .env.local file');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

// ====================================
// BOOKINGS API
// ====================================

/**
 * Create a new booking
 * @param {Object} bookingData - Booking information
 * @returns {Promise<Object>} Created booking with ID
 */
export const createBooking = async (bookingData) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          band_name: bookingData.bandName,
          email: bookingData.email,
          phone: bookingData.phone,
          level: bookingData.level,
          preferred_date: bookingData.preferredDate,
          preferred_time: bookingData.preferredTime,
          band_size: bookingData.bandSize,
          message: bookingData.message,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (error) throw error;

    console.log('✅ Booking created:', data.id);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error creating booking:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get all bookings (Admin only)
 * @param {Object} filters - Optional filters (status, level, date range)
 * @returns {Promise<Array>} List of bookings
 */
export const getBookings = async (filters = {}) => {
  try {
    let query = supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.level) {
      query = query.eq('level', filters.level);
    }
    if (filters.startDate) {
      query = query.gte('preferred_date', filters.startDate);
    }
    if (filters.endDate) {
      query = query.lte('preferred_date', filters.endDate);
    }

    const { data, error } = await query;

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('❌ Error fetching bookings:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update booking status
 * @param {string} bookingId - Booking UUID
 * @param {string} status - New status (pending, confirmed, completed, cancelled)
 * @returns {Promise<Object>} Updated booking
 */
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;

    console.log('✅ Booking status updated:', status);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error updating booking:', error);
    return { success: false, error: error.message };
  }
};

// ====================================
// PAYMENTS API
// ====================================

/**
 * Create payment record
 * @param {Object} paymentData - Payment information
 * @returns {Promise<Object>} Created payment record
 */
export const createPayment = async (paymentData) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .insert([
        {
          booking_id: paymentData.bookingId,
          amount: paymentData.amount,
          currency: paymentData.currency || 'EUR',
          stripe_payment_id: paymentData.stripePaymentId,
          stripe_session_id: paymentData.stripeSessionId,
          status: paymentData.status || 'pending',
        },
      ])
      .select()
      .single();

    if (error) throw error;

    console.log('✅ Payment record created:', data.id);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error creating payment:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update payment status
 * @param {string} stripeSessionId - Stripe session ID
 * @param {string} status - New status (completed, failed, refunded)
 * @returns {Promise<Object>} Updated payment
 */
export const updatePaymentStatus = async (stripeSessionId, status) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .update({
        status,
        paid_at: status === 'completed' ? new Date().toISOString() : null,
      })
      .eq('stripe_session_id', stripeSessionId)
      .select()
      .single();

    if (error) throw error;

    console.log('✅ Payment status updated:', status);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error updating payment:', error);
    return { success: false, error: error.message };
  }
};

// ====================================
// TESTIMONIALS API
// ====================================

/**
 * Get published testimonials
 * @returns {Promise<Array>} List of published testimonials
 */
export const getTestimonials = async () => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('❌ Error fetching testimonials:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Create testimonial (Admin only)
 * @param {Object} testimonialData - Testimonial information
 * @returns {Promise<Object>} Created testimonial
 */
export const createTestimonial = async (testimonialData) => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .insert([
        {
          band_name: testimonialData.bandName,
          text: testimonialData.text,
          rating: testimonialData.rating,
          image_url: testimonialData.imageUrl,
          coaching_level: testimonialData.coachingLevel,
          is_published: testimonialData.isPublished || false,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    console.log('✅ Testimonial created:', data.id);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error creating testimonial:', error);
    return { success: false, error: error.message };
  }
};

// ====================================
// ANALYTICS API
// ====================================

/**
 * Get booking statistics
 * @returns {Promise<Object>} Stats (total bookings, revenue, etc.)
 */
export const getBookingStats = async () => {
  try {
    // Get total bookings
    const { count: totalBookings } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true });

    // Get bookings by status
    const { data: bookingsByStatus } = await supabase
      .from('bookings')
      .select('status');

    // Get total revenue
    const { data: payments } = await supabase
      .from('payments')
      .select('amount')
      .eq('status', 'completed');

    const totalRevenue = payments?.reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0;

    // Get bookings by level
    const { data: bookingsByLevel } = await supabase
      .from('bookings')
      .select('level');

    return {
      success: true,
      data: {
        totalBookings,
        totalRevenue,
        bookingsByStatus,
        bookingsByLevel,
      },
    };
  } catch (error) {
    console.error('❌ Error fetching stats:', error);
    return { success: false, error: error.message };
  }
};

// ====================================
// AUTHENTICATION (for Admin Dashboard)
// ====================================

/**
 * Sign in with email & password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Auth session
 */
export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    console.log('✅ User signed in:', data.user.email);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error signing in:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Sign out
 * @returns {Promise<Object>}
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    console.log('✅ User signed out');
    return { success: true };
  } catch (error) {
    console.error('❌ Error signing out:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get current user
 * @returns {Promise<Object>} Current user or null
 */
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) throw error;

    return { success: true, user };
  } catch (error) {
    console.error('❌ Error getting user:', error);
    return { success: false, user: null };
  }
};

export default supabase;
