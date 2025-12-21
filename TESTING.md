# Testing Guide - BandStage Pro

## 📋 Overview

This project uses **Jest** and **React Testing Library** for comprehensive API testing.

## 🧪 Test Structure

```
src/
├── __tests__/
│   ├── services/
│   │   ├── supabase.test.js     # Supabase API tests
│   │   ├── stripe.test.js       # Stripe payment tests
│   │   └── sendgrid.test.js     # Email service tests
│   ├── integration/
│   │   └── bookingFlow.test.js  # End-to-end booking tests
│   └── utils/
│       └── constants.test.js    # Constants validation tests
├── __mocks__/
│   ├── supabaseMock.js          # Mock Supabase client
│   └── stripeMock.js            # Mock Stripe
└── setupTests.js                # Jest configuration
```

## 🚀 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Run specific test file
```bash
npm test supabase.test.js
```

### Run tests by pattern
```bash
npm test -- --testNamePattern="createBooking"
```

## 📊 Test Coverage

### Current Test Suite Coverage:

#### **Services (Unit Tests)**
- ✅ **Supabase Service** (75+ tests)
  - Booking CRUD operations
  - Payment management
  - Testimonials
  - Analytics
  - Authentication

- ✅ **Stripe Service** (20+ tests)
  - Checkout session creation
  - Payment redirects
  - Error handling
  - Price formatting
  - All coaching levels

- ✅ **SendGrid Service** (25+ tests)
  - Email template generation
  - Booking confirmations
  - Admin notifications
  - Coaching reminders
  - Content validation

#### **Integration Tests**
- ✅ **Complete Booking Flow** (15+ tests)
  - End-to-end booking process
  - Payment completion
  - Dashboard data aggregation
  - Multi-level bookings
  - Concurrent bookings
  - Status updates

#### **Constants Validation** (30+ tests)
- ✅ Coaching levels structure
- ✅ Quiz questions validation
- ✅ Service packages
- ✅ FAQ data
- ✅ App configuration
- ✅ Data integrity checks

**Total: 165+ Tests**

## 🎯 Test Categories

### 1. Unit Tests (`__tests__/services/`)
Test individual service functions in isolation.

**Example:**
```javascript
describe('createBooking', () => {
  it('should create a booking successfully', async () => {
    const bookingData = { /* ... */ };
    const result = await createBooking(bookingData);

    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  });
});
```

### 2. Integration Tests (`__tests__/integration/`)
Test complete workflows and interactions between services.

**Example:**
```javascript
it('should complete entire booking process', async () => {
  // Step 1: Create booking
  const bookingResult = await API.processBooking(data);

  // Step 2: Complete payment
  const paymentResult = await API.completePayment(sessionId);

  expect(bookingResult.success).toBe(true);
  expect(paymentResult.success).toBe(true);
});
```

### 3. Constants Tests (`__tests__/utils/`)
Validate configuration and data integrity.

**Example:**
```javascript
it('should have 4 coaching levels', () => {
  expect(COACHING_LEVELS).toHaveLength(4);
});
```

## 🔧 Mocking Strategy

### Supabase Mock
```javascript
import { supabase } from '../../__mocks__/supabaseMock';

// Automatically mocks all Supabase operations
const result = await supabase.from('bookings').select('*');
```

### Stripe Mock
```javascript
import { mockStripe } from '../../__mocks__/stripeMock';

// Mock Stripe checkout
await mockStripe.redirectToCheckout({ sessionId });
```

## 📝 Writing New Tests

### 1. Create test file
```bash
touch src/__tests__/services/newService.test.js
```

### 2. Import service and mocks
```javascript
import { myFunction } from '../../services/myService';

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => require('../../__mocks__/supabaseMock').supabase),
}));
```

### 3. Write test suite
```javascript
describe('My Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('myFunction', () => {
    it('should do something', async () => {
      const result = await myFunction();
      expect(result).toBeDefined();
    });
  });
});
```

## ✅ Test Best Practices

1. **Clear Test Names**
   ```javascript
   ✅ it('should create booking with valid data')
   ❌ it('test booking')
   ```

2. **AAA Pattern** (Arrange, Act, Assert)
   ```javascript
   it('should...', () => {
     // Arrange
     const data = { /* ... */ };

     // Act
     const result = myFunction(data);

     // Assert
     expect(result).toBe(expected);
   });
   ```

3. **Test One Thing**
   ```javascript
   ✅ it('should validate email')
   ✅ it('should validate phone')
   ❌ it('should validate email and phone')
   ```

4. **Use Descriptive Assertions**
   ```javascript
   ✅ expect(result.success).toBe(true)
   ❌ expect(result).toBeTruthy()
   ```

5. **Clean Up**
   ```javascript
   beforeEach(() => {
     jest.clearAllMocks();
   });
   ```

## 🐛 Debugging Tests

### Run single test in debug mode
```bash
node --inspect-brk node_modules/.bin/jest --runInBand supabase.test.js
```

### View detailed error messages
```bash
npm test -- --verbose
```

### Skip tests temporarily
```javascript
it.skip('should do something', () => {
  // Test skipped
});

describe.skip('Feature', () => {
  // All tests in suite skipped
});
```

### Run only specific tests
```javascript
it.only('should do something', () => {
  // Only this test runs
});
```

## 📈 Coverage Reports

After running `npm run test:coverage`, view coverage at:
```
coverage/lcov-report/index.html
```

### Coverage Thresholds
- Statements: > 80%
- Branches: > 75%
- Functions: > 80%
- Lines: > 80%

## 🔄 Continuous Integration

Tests run automatically on:
- Every commit
- Pull requests
- Before deployment

### CI Configuration
```yaml
# .github/workflows/test.yml
- name: Run tests
  run: npm test

- name: Generate coverage
  run: npm run test:coverage
```

## 🚨 Common Test Failures

### 1. Environment Variables Missing
**Error:** `Missing Supabase environment variables`

**Fix:** Ensure `setupTests.js` sets all required env vars:
```javascript
process.env.REACT_APP_SUPABASE_URL = 'https://test.supabase.co';
```

### 2. Async Test Timeout
**Error:** `Timeout - Async callback was not invoked`

**Fix:** Use async/await or increase timeout:
```javascript
it('should...', async () => {
  const result = await asyncFunction();
}, 10000); // 10 second timeout
```

### 3. Mock Not Working
**Error:** `Cannot read property 'from' of undefined`

**Fix:** Check mock is properly imported:
```javascript
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => require('../../__mocks__/supabaseMock').supabase),
}));
```

## 📚 Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 🎯 Next Steps

- [ ] Add E2E tests with Cypress/Playwright
- [ ] Add visual regression tests
- [ ] Implement performance testing
- [ ] Add accessibility tests
- [ ] Increase coverage to 90%+

---

**Happy Testing! 🧪**
