import { loadStripe } from '@stripe/stripe-js';
import { COACHING_LEVELS } from '../utils/constants';

// Load Stripe with public key
const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  console.error('❌ Missing Stripe public key!');
  console.error('Please add REACT_APP_STRIPE_PUBLIC_KEY to your .env.local file');
}

// Initialize Stripe
let stripePromise;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublicKey);
  }
  return stripePromise;
};

/**
 * Create Stripe Checkout Session
 * @param {Object} bookingData - Booking information including level and booking ID
 * @returns {Promise<Object>} Stripe session ID and URL
 */
export const createCheckoutSession = async (bookingData) => {
  try {
    // Find coaching level details
    const coachingLevel = COACHING_LEVELS.find((l) => l.id === bookingData.level);

    if (!coachingLevel) {
      throw new Error('Invalid coaching level');
    }

    // Prepare line items for Stripe
    const lineItems = [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${coachingLevel.name} Coaching`,
            description: `${coachingLevel.duration} Band-Coaching Session`,
            images: [], // Add product images if available
          },
          unit_amount: coachingLevel.price * 100, // Convert to cents
        },
        quantity: 1,
      },
    ];

    // Create checkout session
    // NOTE: This requires a backend endpoint to securely create Stripe sessions
    // For now, we'll create a placeholder that shows what data needs to be sent
    const sessionData = {
      payment_method_types: ['card', 'sepa_debit', 'giropay'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${window.location.origin}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${window.location.origin}/booking-cancelled`,
      customer_email: bookingData.email,
      metadata: {
        booking_id: bookingData.bookingId,
        band_name: bookingData.bandName,
        level: bookingData.level,
        preferred_date: bookingData.preferredDate,
      },
    };

    // TODO: Send this to your backend API endpoint
    // const response = await fetch('/api/create-checkout-session', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(sessionData),
    // });

    // For development: Log what would be sent
    console.log('📦 Checkout Session Data:', sessionData);

    // Placeholder return - replace with actual API call
    return {
      success: true,
      sessionId: 'cs_test_placeholder',
      message:
        'Stripe checkout is configured. Add backend endpoint to complete integration.',
    };
  } catch (error) {
    console.error('❌ Error creating checkout session:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Redirect to Stripe Checkout
 * @param {string} sessionId - Stripe session ID
 * @returns {Promise<void>}
 */
export const redirectToCheckout = async (sessionId) => {
  try {
    const stripe = await getStripe();

    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('❌ Error redirecting to checkout:', error);
    throw error;
  }
};

/**
 * Handle successful payment
 * @param {string} sessionId - Stripe session ID
 * @returns {Promise<Object>} Payment details
 */
export const handlePaymentSuccess = async (sessionId) => {
  try {
    // TODO: Verify session with backend
    // const response = await fetch(`/api/verify-session?session_id=${sessionId}`);
    // const session = await response.json();

    console.log('✅ Payment successful for session:', sessionId);

    // Placeholder return
    return {
      success: true,
      sessionId,
      message: 'Payment verified successfully',
    };
  } catch (error) {
    console.error('❌ Error handling payment success:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Handle payment error/cancellation
 * @param {Error} error - Payment error
 * @returns {Object} Error details
 */
export const handlePaymentError = (error) => {
  console.error('❌ Payment error:', error);

  return {
    success: false,
    error: error.message || 'Payment failed',
    details: error,
  };
};

/**
 * Format price for display
 * @param {number} amount - Amount in cents
 * @param {string} currency - Currency code (default: EUR)
 * @returns {string} Formatted price string
 */
export const formatPrice = (amount, currency = 'EUR') => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
  }).format(amount);
};

export default {
  getStripe,
  createCheckoutSession,
  redirectToCheckout,
  handlePaymentSuccess,
  handlePaymentError,
  formatPrice,
};
