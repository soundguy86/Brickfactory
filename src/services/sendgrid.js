import { COACHING_LEVELS, APP_CONFIG } from '../utils/constants';

/**
 * SendGrid Email Service
 * NOTE: Email sending must happen from a backend/serverless function
 * This file provides email templates and helper functions
 */

const SENDGRID_API_KEY = process.env.REACT_APP_SENDGRID_API_KEY;

if (!SENDGRID_API_KEY) {
  console.warn('⚠️ SendGrid API key not found in environment variables');
}

/**
 * Email Templates
 */

// Booking Confirmation Email Template
export const getBookingConfirmationTemplate = (bookingData) => {
  const coachingLevel = COACHING_LEVELS.find((l) => l.id === bookingData.level);

  return {
    to: bookingData.email,
    from: APP_CONFIG.supportEmail,
    subject: `Buchungsbestätigung - ${coachingLevel.name} Coaching | BandStage Pro`,
    html: `
      <!DOCTYPE html>
      <html lang="de">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Inter', Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #FF6B35 0%, #00D9FF 100%); padding: 40px 30px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
          .content { padding: 40px 30px; color: #333333; }
          .booking-details { background: #f9f9f9; border-left: 4px solid #FF6B35; padding: 20px; margin: 20px 0; border-radius: 8px; }
          .booking-details h2 { margin-top: 0; color: #FF6B35; font-size: 20px; }
          .detail-row { margin: 12px 0; font-size: 16px; }
          .detail-label { font-weight: 600; color: #666; }
          .button { display: inline-block; background: #FF6B35; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
          .button:hover { background: #00D9FF; }
          .footer { background: #0F0F1E; color: #ffffff; padding: 30px; text-align: center; font-size: 14px; }
          .footer a { color: #00D9FF; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎸 Buchung bestätigt!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">BandStage Pro Regensburg</p>
          </div>

          <div class="content">
            <p>Hey ${bookingData.bandName},</p>
            <p><strong>Eure Buchung ist eingegangen!</strong> Wir freuen uns mega auf eure Coaching-Session. 🎉</p>

            <div class="booking-details">
              <h2>Eure Buchungsdetails</h2>
              <div class="detail-row">
                <span class="detail-label">Coaching-Level:</span> ${coachingLevel.name} (${coachingLevel.duration})
              </div>
              <div class="detail-row">
                <span class="detail-label">Preis:</span> ${coachingLevel.price}€
              </div>
              <div class="detail-row">
                <span class="detail-label">Wunschtermin:</span> ${bookingData.preferredDate} ${bookingData.preferredTime || ''}
              </div>
              <div class="detail-row">
                <span class="detail-label">Band:</span> ${bookingData.bandName}
              </div>
              <div class="detail-row">
                <span class="detail-label">E-Mail:</span> ${bookingData.email}
              </div>
              <div class="detail-row">
                <span class="detail-label">Telefon:</span> ${bookingData.phone}
              </div>
            </div>

            <h3>Wie geht's weiter?</h3>
            <ol style="line-height: 1.8; color: #555;">
              <li>Wir melden uns innerhalb von 24h bei euch per E-Mail</li>
              <li>Gemeinsam finden wir den perfekten Termin</li>
              <li>Ihr bekommt alle Infos zur Location & Vorbereitung</li>
              <li>Am Coaching-Tag: Einfach Instrumente & gute Laune mitbringen! 🎸</li>
            </ol>

            <h3>Fragen?</h3>
            <p>Meldet euch jederzeit bei uns:</p>
            <p>
              📧 <a href="mailto:${APP_CONFIG.supportEmail}">${APP_CONFIG.supportEmail}</a><br>
              📱 ${APP_CONFIG.phone}
            </p>

            <center>
              <a href="https://bandstage-pro.de" class="button">Zur Website</a>
            </center>
          </div>

          <div class="footer">
            <p><strong>BandStage Pro Regensburg</strong></p>
            <p>Live sound engineering platform</p>
            <p style="margin-top: 20px; font-size: 12px; opacity: 0.8;">
              ${APP_CONFIG.address} | ${APP_CONFIG.businessHours}
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hallo ${bookingData.bandName},

eure Buchung ist eingegangen! Wir freuen uns auf eure Coaching-Session.

BUCHUNGSDETAILS:
- Coaching-Level: ${coachingLevel.name} (${coachingLevel.duration})
- Preis: ${coachingLevel.price}€
- Wunschtermin: ${bookingData.preferredDate} ${bookingData.preferredTime || ''}

WIE GEHT'S WEITER?
1. Wir melden uns innerhalb von 24h bei euch
2. Gemeinsam finden wir den perfekten Termin
3. Ihr bekommt alle Infos zur Location & Vorbereitung
4. Am Coaching-Tag: Instrumente & gute Laune mitbringen!

FRAGEN?
E-Mail: ${APP_CONFIG.supportEmail}
Telefon: ${APP_CONFIG.phone}

Bis bald!
Euer BandStage Pro Team
    `,
  };
};

// Admin Notification Email Template
export const getAdminNotificationTemplate = (bookingData) => {
  const coachingLevel = COACHING_LEVELS.find((l) => l.id === bookingData.level);

  return {
    to: APP_CONFIG.adminEmail,
    from: APP_CONFIG.supportEmail,
    subject: `🔔 Neue Buchung: ${coachingLevel.name} - ${bookingData.bandName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
          .container { max-width: 600px; background: #fff; padding: 30px; border-radius: 8px; }
          .header { background: #FF6B35; color: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .details { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { padding: 8px 0; border-bottom: 1px solid #eee; }
          .label { font-weight: bold; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🎸 Neue Coaching-Buchung!</h2>
          </div>

          <div class="details">
            <div class="detail-row">
              <span class="label">Band:</span> ${bookingData.bandName}
            </div>
            <div class="detail-row">
              <span class="label">Level:</span> ${coachingLevel.name} (${coachingLevel.duration})
            </div>
            <div class="detail-row">
              <span class="label">Preis:</span> ${coachingLevel.price}€
            </div>
            <div class="detail-row">
              <span class="label">E-Mail:</span> ${bookingData.email}
            </div>
            <div class="detail-row">
              <span class="label">Telefon:</span> ${bookingData.phone}
            </div>
            <div class="detail-row">
              <span class="label">Wunschtermin:</span> ${bookingData.preferredDate} ${bookingData.preferredTime || ''}
            </div>
            <div class="detail-row">
              <span class="label">Bandgröße:</span> ${bookingData.bandSize || 'Nicht angegeben'}
            </div>
            ${bookingData.message ? `
            <div class="detail-row">
              <span class="label">Nachricht:</span><br>
              ${bookingData.message}
            </div>
            ` : ''}
          </div>

          <p><strong>Nächste Schritte:</strong></p>
          <ol>
            <li>Band innerhalb 24h kontaktieren</li>
            <li>Termin bestätigen & in Kalender eintragen</li>
            <li>Buchungsstatus im Admin-Dashboard auf "Confirmed" setzen</li>
          </ol>

          <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
            Diese E-Mail wurde automatisch generiert von BandStage Pro Booking System.
          </p>
        </div>
      </body>
      </html>
    `,
  };
};

// Coaching Reminder Email (7 days before)
export const getCoachingReminderTemplate = (bookingData, coachingDate) => {
  const coachingLevel = COACHING_LEVELS.find((l) => l.id === bookingData.level);

  return {
    to: bookingData.email,
    from: APP_CONFIG.supportEmail,
    subject: `Erinnerung: Euer ${coachingLevel.name} Coaching in 7 Tagen! 🎸`,
    html: `
      <!DOCTYPE html>
      <html lang="de">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
          .container { max-width: 600px; background: #fff; padding: 30px; border-radius: 8px; margin: 0 auto; }
          .header { background: #00D9FF; color: #fff; padding: 20px; border-radius: 8px; text-align: center; }
          .checklist { background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px; }
          .checklist li { margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🎸 Euer Coaching ist bald!</h2>
          </div>

          <p>Hey ${bookingData.bandName},</p>
          <p>In einer Woche ist es soweit - euer <strong>${coachingLevel.name} Coaching</strong>!</p>

          <div style="background: #0F0F1E; color: #fff; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h3 style="margin: 0; color: #00D9FF;">📅 ${coachingDate}</h3>
          </div>

          <div class="checklist">
            <h3>📝 Checklist zur Vorbereitung:</h3>
            <ul>
              <li>✅ Instrumente & Kabel checken</li>
              <li>✅ Setlist überlegen (2-3 Songs reichen)</li>
              <li>✅ Fragen & Probleme notieren</li>
              <li>✅ Alle Bandmitglieder informieren</li>
              <li>✅ Gute Laune mitbringen! 🎉</li>
            </ul>
          </div>

          <h3>Location & Anfahrt:</h3>
          <p>
            <strong>Adresse:</strong> ${APP_CONFIG.address}<br>
            <strong>Parken:</strong> Kostenlose Parkplätze vor Ort
          </p>

          <h3>Fragen?</h3>
          <p>
            📧 ${APP_CONFIG.supportEmail}<br>
            📱 ${APP_CONFIG.phone}
          </p>

          <p style="margin-top: 30px;">Wir freuen uns auf euch! 🚀</p>
          <p>Euer BandStage Pro Team</p>
        </div>
      </body>
      </html>
    `,
  };
};

/**
 * Send email via backend API
 * NOTE: This must be implemented in a backend/serverless function for security
 * @param {Object} emailData - Email template data
 * @returns {Promise<Object>} Send result
 */
export const sendEmail = async (emailData) => {
  try {
    // TODO: Implement backend endpoint for sending emails
    // const response = await fetch('/api/send-email', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(emailData),
    // });

    console.log('📧 Email would be sent:', emailData.subject);
    console.log('To:', emailData.to);

    // Placeholder return
    return {
      success: true,
      message: 'Email template created. Implement backend to send.',
    };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Send booking confirmation email
 */
export const sendBookingConfirmation = async (bookingData) => {
  const emailTemplate = getBookingConfirmationTemplate(bookingData);
  return await sendEmail(emailTemplate);
};

/**
 * Send admin notification email
 */
export const sendAdminNotification = async (bookingData) => {
  const emailTemplate = getAdminNotificationTemplate(bookingData);
  return await sendEmail(emailTemplate);
};

/**
 * Send coaching reminder email
 */
export const sendCoachingReminder = async (bookingData, coachingDate) => {
  const emailTemplate = getCoachingReminderTemplate(bookingData, coachingDate);
  return await sendEmail(emailTemplate);
};

export default {
  sendEmail,
  sendBookingConfirmation,
  sendAdminNotification,
  sendCoachingReminder,
  getBookingConfirmationTemplate,
  getAdminNotificationTemplate,
  getCoachingReminderTemplate,
};
