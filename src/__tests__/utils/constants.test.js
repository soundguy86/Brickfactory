/**
 * Constants Tests
 * Tests for coaching levels, quiz questions, and configuration
 */

import {
  COACHING_LEVELS,
  QUIZ_QUESTIONS,
  SERVICE_PACKAGES,
  FAQ_DATA,
  APP_CONFIG,
} from '../../utils/constants';

describe('Constants - COACHING_LEVELS', () => {
  it('should have 4 coaching levels', () => {
    expect(COACHING_LEVELS).toHaveLength(4);
  });

  it('should have correct level IDs', () => {
    const levelIds = COACHING_LEVELS.map((level) => level.id);
    expect(levelIds).toEqual(['rookie', 'intermediate', 'advanced', 'masterclass']);
  });

  it('should have correct prices', () => {
    expect(COACHING_LEVELS[0].price).toBe(199); // Rookie
    expect(COACHING_LEVELS[1].price).toBe(349); // Intermediate
    expect(COACHING_LEVELS[2].price).toBe(549); // Advanced
    expect(COACHING_LEVELS[3].price).toBe(899); // Masterclass
  });

  it('should have durations defined', () => {
    COACHING_LEVELS.forEach((level) => {
      expect(level.duration).toBeDefined();
      expect(typeof level.duration).toBe('string');
      expect(level.duration).toMatch(/\d+h/);
    });
  });

  it('should have colors defined', () => {
    COACHING_LEVELS.forEach((level) => {
      expect(level.color).toBeDefined();
      expect(level.color).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  it('should have features arrays', () => {
    COACHING_LEVELS.forEach((level) => {
      expect(Array.isArray(level.features)).toBe(true);
      expect(level.features.length).toBeGreaterThan(0);
    });
  });

  it('should have descriptions', () => {
    COACHING_LEVELS.forEach((level) => {
      expect(level.desc).toBeDefined();
      expect(typeof level.desc).toBe('string');
      expect(level.desc.length).toBeGreaterThan(0);
    });
  });

  it('should have icons', () => {
    COACHING_LEVELS.forEach((level) => {
      expect(level.icon).toBeDefined();
      expect(typeof level.icon).toBe('string');
    });
  });

  it('should have intermediate marked as popular', () => {
    const intermediate = COACHING_LEVELS.find((l) => l.id === 'intermediate');
    expect(intermediate.popular).toBe(true);
  });

  it('should have increasing prices from rookie to masterclass', () => {
    for (let i = 1; i < COACHING_LEVELS.length; i++) {
      expect(COACHING_LEVELS[i].price).toBeGreaterThan(
        COACHING_LEVELS[i - 1].price
      );
    }
  });

  it('should have increasing durations from rookie to masterclass', () => {
    const durations = COACHING_LEVELS.map((l) => parseInt(l.duration));
    for (let i = 1; i < durations.length; i++) {
      expect(durations[i]).toBeGreaterThan(durations[i - 1]);
    }
  });
});

describe('Constants - QUIZ_QUESTIONS', () => {
  it('should have 3 quiz questions', () => {
    expect(QUIZ_QUESTIONS).toHaveLength(3);
  });

  it('should have question IDs', () => {
    QUIZ_QUESTIONS.forEach((q) => {
      expect(q.id).toBeDefined();
      expect(typeof q.id).toBe('number');
    });
  });

  it('should have question text', () => {
    QUIZ_QUESTIONS.forEach((q) => {
      expect(q.question).toBeDefined();
      expect(typeof q.question).toBe('string');
      expect(q.question.length).toBeGreaterThan(0);
    });
  });

  it('should have options arrays', () => {
    QUIZ_QUESTIONS.forEach((q) => {
      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options.length).toBeGreaterThan(0);
    });
  });

  it('should have valid option structure', () => {
    QUIZ_QUESTIONS.forEach((q) => {
      q.options.forEach((opt) => {
        expect(opt.text).toBeDefined();
        expect(opt.score).toBeDefined();
        expect(typeof opt.score).toBe('number');
        expect(opt.levelHint).toBeDefined();
      });
    });
  });

  it('should have scores between 1 and 4', () => {
    QUIZ_QUESTIONS.forEach((q) => {
      q.options.forEach((opt) => {
        expect(opt.score).toBeGreaterThanOrEqual(1);
        expect(opt.score).toBeLessThanOrEqual(4);
      });
    });
  });

  it('should have valid level hints', () => {
    const validLevels = ['rookie', 'intermediate', 'advanced', 'masterclass'];
    QUIZ_QUESTIONS.forEach((q) => {
      q.options.forEach((opt) => {
        expect(validLevels).toContain(opt.levelHint);
      });
    });
  });
});

describe('Constants - SERVICE_PACKAGES', () => {
  it('should have 3 service packages', () => {
    expect(SERVICE_PACKAGES).toHaveLength(3);
  });

  it('should have correct package IDs', () => {
    const packageIds = SERVICE_PACKAGES.map((pkg) => pkg.id);
    expect(packageIds).toEqual(['starter', 'professional', 'premium']);
  });

  it('should have prices defined', () => {
    SERVICE_PACKAGES.forEach((pkg) => {
      expect(pkg.price).toBeDefined();
      expect(typeof pkg.price).toBe('number');
      expect(pkg.price).toBeGreaterThan(0);
    });
  });

  it('should have features arrays', () => {
    SERVICE_PACKAGES.forEach((pkg) => {
      expect(Array.isArray(pkg.features)).toBe(true);
      expect(pkg.features.length).toBeGreaterThan(0);
    });
  });

  it('should have professional marked as popular', () => {
    const professional = SERVICE_PACKAGES.find((p) => p.id === 'professional');
    expect(professional.popular).toBe(true);
  });

  it('should have increasing prices', () => {
    expect(SERVICE_PACKAGES[1].price).toBeGreaterThan(SERVICE_PACKAGES[0].price);
    expect(SERVICE_PACKAGES[2].price).toBeGreaterThan(SERVICE_PACKAGES[1].price);
  });
});

describe('Constants - FAQ_DATA', () => {
  it('should have at least 7 FAQ items', () => {
    expect(FAQ_DATA.length).toBeGreaterThanOrEqual(7);
  });

  it('should have valid FAQ structure', () => {
    FAQ_DATA.forEach((faq) => {
      expect(faq.id).toBeDefined();
      expect(faq.question).toBeDefined();
      expect(faq.answer).toBeDefined();
      expect(typeof faq.question).toBe('string');
      expect(typeof faq.answer).toBe('string');
    });
  });

  it('should have questions ending with question marks', () => {
    FAQ_DATA.forEach((faq) => {
      expect(faq.question.endsWith('?')).toBe(true);
    });
  });

  it('should have unique IDs', () => {
    const ids = FAQ_DATA.map((faq) => faq.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should cover key topics', () => {
    const questions = FAQ_DATA.map((faq) => faq.question.toLowerCase());

    const hasLevelDifference = questions.some((q) =>
      q.includes('level') || q.includes('unterscheiden')
    );
    const hasRescheduling = questions.some((q) =>
      q.includes('verschieben') || q.includes('absage')
    );
    const hasIncluded = questions.some((q) =>
      q.includes('enthalten') || q.includes('inklusive')
    );

    expect(hasLevelDifference).toBe(true);
    expect(hasRescheduling).toBe(true);
    expect(hasIncluded).toBe(true);
  });
});

describe('Constants - APP_CONFIG', () => {
  it('should have admin email', () => {
    expect(APP_CONFIG.adminEmail).toBeDefined();
    expect(APP_CONFIG.adminEmail).toMatch(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
  });

  it('should have support email', () => {
    expect(APP_CONFIG.supportEmail).toBeDefined();
    expect(APP_CONFIG.supportEmail).toMatch(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
  });

  it('should have phone number', () => {
    expect(APP_CONFIG.phone).toBeDefined();
    expect(typeof APP_CONFIG.phone).toBe('string');
  });

  it('should have address', () => {
    expect(APP_CONFIG.address).toBeDefined();
    expect(typeof APP_CONFIG.address).toBe('string');
  });

  it('should have business hours', () => {
    expect(APP_CONFIG.businessHours).toBeDefined();
    expect(typeof APP_CONFIG.businessHours).toBe('string');
  });

  it('should have social media links', () => {
    expect(APP_CONFIG.socialMedia).toBeDefined();
    expect(typeof APP_CONFIG.socialMedia).toBe('object');
  });

  it('should have valid social media URLs', () => {
    if (APP_CONFIG.socialMedia.instagram) {
      expect(APP_CONFIG.socialMedia.instagram).toMatch(/^https?:\/\//);
    }
    if (APP_CONFIG.socialMedia.facebook) {
      expect(APP_CONFIG.socialMedia.facebook).toMatch(/^https?:\/\//);
    }
  });
});

describe('Constants - Data Integrity', () => {
  it('should have consistent level references across constants', () => {
    const levelIds = COACHING_LEVELS.map((l) => l.id);

    QUIZ_QUESTIONS.forEach((q) => {
      q.options.forEach((opt) => {
        expect(levelIds).toContain(opt.levelHint);
      });
    });
  });

  it('should not have duplicate level IDs', () => {
    const ids = COACHING_LEVELS.map((l) => l.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should not have duplicate service package IDs', () => {
    const ids = SERVICE_PACKAGES.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have all required fields for each level', () => {
    const requiredFields = [
      'id',
      'name',
      'price',
      'duration',
      'color',
      'features',
      'desc',
      'icon',
    ];

    COACHING_LEVELS.forEach((level) => {
      requiredFields.forEach((field) => {
        expect(level).toHaveProperty(field);
      });
    });
  });
});
