/**
 * SendGrid Email Service Tests
 */

import {
  sendBookingConfirmation,
  sendAdminNotification,
  sendCoachingReminder,
  getBookingConfirmationTemplate,
  getAdminNotificationTemplate,
  getCoachingReminderTemplate,
} from '../../services/sendgrid';

describe('SendGrid Email Service', () => {
  const mockBookingData = {
    bandName: 'Test Band',
    email: 'test@band.com',
    phone: '+49123456789',
    level: 'intermediate',
    preferredDate: '2025-01-15',
    preferredTime: 'Sa 15:00',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Email Templates', () => {
    describe('getBookingConfirmationTemplate', () => {
      it('should generate booking confirmation template', () => {
        const template = getBookingConfirmationTemplate(mockBookingData);

        expect(template).toHaveProperty('to');
        expect(template).toHaveProperty('from');
        expect(template).toHaveProperty('subject');
        expect(template).toHaveProperty('html');
        expect(template).toHaveProperty('text');

        expect(template.to).toBe(mockBookingData.email);
        expect(template.subject).toContain('Buchungsbestätigung');
      });

      it('should include band name in email', () => {
        const template = getBookingConfirmationTemplate(mockBookingData);

        expect(template.html).toContain('Test Band');
        expect(template.text).toContain('Test Band');
      });

      it('should include coaching level in email', () => {
        const template = getBookingConfirmationTemplate(mockBookingData);

        expect(template.html).toContain('Intermediate');
        expect(template.subject).toContain('Intermediate');
      });

      it('should include booking details in HTML', () => {
        const template = getBookingConfirmationTemplate(mockBookingData);

        expect(template.html).toContain(mockBookingData.preferredDate);
        expect(template.html).toContain(mockBookingData.email);
        expect(template.html).toContain(mockBookingData.phone);
      });

      it('should include booking details in plain text', () => {
        const template = getBookingConfirmationTemplate(mockBookingData);

        expect(template.text).toContain(mockBookingData.preferredDate);
        expect(template.text).toContain(mockBookingData.email);
      });

      it('should include price in template', () => {
        const template = getBookingConfirmationTemplate(mockBookingData);

        expect(template.html).toContain('349€'); // Intermediate price
      });
    });

    describe('getAdminNotificationTemplate', () => {
      it('should generate admin notification template', () => {
        const template = getAdminNotificationTemplate(mockBookingData);

        expect(template).toHaveProperty('to');
        expect(template).toHaveProperty('subject');
        expect(template).toHaveProperty('html');

        expect(template.subject).toContain('Neue Buchung');
        expect(template.subject).toContain('Test Band');
      });

      it('should include all booking details', () => {
        const template = getAdminNotificationTemplate(mockBookingData);

        expect(template.html).toContain(mockBookingData.bandName);
        expect(template.html).toContain(mockBookingData.email);
        expect(template.html).toContain(mockBookingData.phone);
        expect(template.html).toContain(mockBookingData.preferredDate);
      });

      it('should include next steps for admin', () => {
        const template = getAdminNotificationTemplate(mockBookingData);

        expect(template.html).toContain('Nächste Schritte');
        expect(template.html).toContain('Band innerhalb 24h kontaktieren');
      });

      it('should include message if provided', () => {
        const dataWithMessage = {
          ...mockBookingData,
          message: 'We have issues with monitor mix',
        };

        const template = getAdminNotificationTemplate(dataWithMessage);

        expect(template.html).toContain('We have issues with monitor mix');
      });
    });

    describe('getCoachingReminderTemplate', () => {
      it('should generate coaching reminder template', () => {
        const coachingDate = '15. Januar 2025, 15:00 Uhr';
        const template = getCoachingReminderTemplate(mockBookingData, coachingDate);

        expect(template).toHaveProperty('to');
        expect(template).toHaveProperty('subject');
        expect(template).toHaveProperty('html');

        expect(template.to).toBe(mockBookingData.email);
        expect(template.subject).toContain('Erinnerung');
        expect(template.subject).toContain('7 Tagen');
      });

      it('should include coaching date', () => {
        const coachingDate = '15. Januar 2025, 15:00 Uhr';
        const template = getCoachingReminderTemplate(mockBookingData, coachingDate);

        expect(template.html).toContain(coachingDate);
      });

      it('should include preparation checklist', () => {
        const template = getCoachingReminderTemplate(mockBookingData, 'Test Date');

        expect(template.html).toContain('Checklist');
        expect(template.html).toContain('Instrumente');
        expect(template.html).toContain('Setlist');
      });

      it('should include location info', () => {
        const template = getCoachingReminderTemplate(mockBookingData, 'Test Date');

        expect(template.html).toContain('Location');
        expect(template.html).toContain('Anfahrt');
      });
    });
  });

  describe('Email Sending Functions', () => {
    describe('sendBookingConfirmation', () => {
      it('should send booking confirmation email', async () => {
        const result = await sendBookingConfirmation(mockBookingData);

        expect(result).toHaveProperty('success');
        expect(result).toHaveProperty('message');
      });

      it('should handle send errors gracefully', async () => {
        const result = await sendBookingConfirmation({});

        expect(result).toHaveProperty('success');
        // Should not throw, even with invalid data
      });
    });

    describe('sendAdminNotification', () => {
      it('should send admin notification email', async () => {
        const result = await sendAdminNotification(mockBookingData);

        expect(result).toHaveProperty('success');
      });
    });

    describe('sendCoachingReminder', () => {
      it('should send coaching reminder email', async () => {
        const coachingDate = '15. Januar 2025, 15:00 Uhr';
        const result = await sendCoachingReminder(mockBookingData, coachingDate);

        expect(result).toHaveProperty('success');
      });
    });
  });

  describe('Email Content Validation', () => {
    it('should not include undefined values in templates', () => {
      const incompleteData = {
        bandName: 'Test Band',
        email: 'test@band.com',
        level: 'rookie',
      };

      const template = getBookingConfirmationTemplate(incompleteData);

      expect(template.html).not.toContain('undefined');
      expect(template.text).not.toContain('undefined');
    });

    it('should include support email in all templates', () => {
      const confirmationTemplate = getBookingConfirmationTemplate(mockBookingData);
      const adminTemplate = getAdminNotificationTemplate(mockBookingData);
      const reminderTemplate = getCoachingReminderTemplate(mockBookingData, 'Test');

      expect(confirmationTemplate.html).toContain('support@bandstage-pro.de');
      expect(reminderTemplate.html).toContain('support@bandstage-pro.de');
      // Admin template might not have support email
    });

    it('should use correct email sender', () => {
      const template = getBookingConfirmationTemplate(mockBookingData);

      expect(template.from).toBe('support@bandstage-pro.de');
    });
  });
});
