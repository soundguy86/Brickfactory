/**
 * Central API Service
 * Combines all backend services (Supabase, Stripe, SendGrid)
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
} from './supabase';

import {
  createCheckoutSession,
  redirectToCheckout,
  handlePaymentSuccess,
  handlePaymentError,
  formatPrice,
} from './stripe';

import {
  sendBookingConfirmation,
  sendAdminNotification,
  sendCoachingReminder,
} from './sendgrid';

/**
 * Complete Booking Flow
 * 1. Create booking in database
 * 2. Create Stripe checkout session
 * 3. Send confirmation emails
 * 4. Redirect to payment
 */
export const processBooking = async (bookingData) => {
  try {
    console.log('🚀 Processing booking:', bookingData);

    // Step 1: Create booking in database
    const bookingResult = await createBooking(bookingData);

    if (!bookingResult.success) {
      throw new Error(bookingResult.error);
    }

    const booking = bookingResult.data;

    // Step 2: Create Stripe checkout session
    const checkoutData = {
      ...bookingData,
      bookingId: booking.id,
    };

    const checkoutResult = await createCheckoutSession(checkoutData);

    if (!checkoutResult.success) {
      // Rollback: Update booking status to failed
      await updateBookingStatus(booking.id, 'cancelled');
      throw new Error(checkoutResult.error);
    }

    // Step 3: Create payment record
    await createPayment({
      bookingId: booking.id,
      amount: bookingData.price,
      currency: 'EUR',
      stripeSessionId: checkoutResult.sessionId,
      status: 'pending',
    });

    // Step 4: Send emails (async, don't wait)
    sendBookingConfirmation(bookingData).catch((err) =>
      console.error('Failed to send confirmation email:', err)
    );

    sendAdminNotification(bookingData).catch((err) =>
      console.error('Failed to send admin notification:', err)
    );

    return {
      success: true,
      booking,
      checkoutSessionId: checkoutResult.sessionId,
    };
  } catch (error) {
    console.error('❌ Error processing booking:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Complete Payment Success Flow
 * 1. Verify payment with Stripe
 * 2. Update payment status in database
 * 3. Update booking status to confirmed
 */
export const completePayment = async (sessionId) => {
  try {
    console.log('💳 Completing payment for session:', sessionId);

    // Step 1: Verify payment
    const paymentResult = await handlePaymentSuccess(sessionId);

    if (!paymentResult.success) {
      throw new Error(paymentResult.error);
    }

    // Step 2: Update payment status
    await updatePaymentStatus(sessionId, 'completed');

    // Step 3: Update booking status
    // TODO: Get booking ID from payment record
    // await updateBookingStatus(bookingId, 'confirmed');

    return {
      success: true,
      message: 'Payment completed successfully',
    };
  } catch (error) {
    console.error('❌ Error completing payment:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Admin: Get Dashboard Data
 * Fetches all data needed for admin dashboard
 */
export const getDashboardData = async () => {
  try {
    // Fetch all data in parallel
    const [bookingsResult, statsResult, testimonialsResult] = await Promise.all([
      getBookings(),
      getBookingStats(),
      getTestimonials(),
    ]);

    return {
      success: true,
      data: {
        bookings: bookingsResult.data || [],
        stats: statsResult.data || {},
        testimonials: testimonialsResult.data || [],
      },
    };
  } catch (error) {
    console.error('❌ Error fetching dashboard data:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Export all services
export const API = {
  // Booking Flow
  processBooking,
  completePayment,

  // Bookings
  createBooking,
  getBookings,
  updateBookingStatus,

  // Payments
  createPayment,
  updatePaymentStatus,
  createCheckoutSession,
  redirectToCheckout,
  handlePaymentSuccess,
  handlePaymentError,
  formatPrice,

  // Emails
  sendBookingConfirmation,
  sendAdminNotification,
  sendCoachingReminder,

  // Testimonials
  getTestimonials,
  createTestimonial,

  // Analytics
  getBookingStats,
  getDashboardData,

  // Auth
  signIn,
  signOut,
  getCurrentUser,
};

export default API;
