# Supabase Database Setup für BandStage Pro

## 📋 Anleitung zum Einrichten der Supabase-Datenbank

### 1. Supabase Projekt erstellen
1. Gehe zu [https://supabase.com](https://supabase.com)
2. Erstelle ein neues Projekt: "bandstage-pro-regensburg"
3. Wähle Region: Europe (Frankfurt oder Amsterdam)
4. Notiere dir:
   - Project URL: `https://xxxxx.supabase.co`
   - Anon/Public Key: `eyJhbGc...`

### 2. Database Tables erstellen

Führe die folgenden SQL-Befehle in der Supabase SQL-Konsole aus:

```sql
-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================
-- TABLE: bookings
-- ====================================
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  band_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  level VARCHAR(50) NOT NULL CHECK (level IN ('rookie', 'intermediate', 'advanced', 'masterclass')),
  preferred_date DATE NOT NULL,
  preferred_time VARCHAR(50),
  band_size INTEGER,
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ====================================
-- TABLE: users (Admin & Coaches)
-- ====================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  auth_id UUID UNIQUE,
  role VARCHAR(50) DEFAULT 'coach' CHECK (role IN ('admin', 'coach')),
  full_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ====================================
-- TABLE: coaching_sessions
-- ====================================
CREATE TABLE coaching_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  coach_id UUID REFERENCES users(id),
  session_date DATE NOT NULL,
  session_time VARCHAR(50),
  duration_hours INTEGER,
  notes TEXT,
  feedback TEXT,
  status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ====================================
-- TABLE: payments
-- ====================================
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  stripe_payment_id VARCHAR(255) UNIQUE,
  stripe_session_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ====================================
-- TABLE: testimonials
-- ====================================
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  band_name VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  coaching_level VARCHAR(50),
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ====================================
-- INDEXES für Performance
-- ====================================
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_level ON bookings(level);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_coaching_sessions_booking_id ON coaching_sessions(booking_id);
CREATE INDEX idx_testimonials_published ON testimonials(is_published);

-- ====================================
-- RLS (Row Level Security) Policies
-- ====================================

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaching_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Bookings: Jeder kann erstellen, nur Admins können alle sehen
CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all bookings" ON bookings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Users: Nur Admins können User verwalten
CREATE POLICY "Admins can manage users" ON users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Coaching Sessions: Nur Admins & Coaches
CREATE POLICY "Coaches can view their sessions" ON coaching_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()
    )
  );

-- Payments: Nur Admins
CREATE POLICY "Admins can view payments" ON payments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Testimonials: Jeder kann published sehen, Admins können alle verwalten
CREATE POLICY "Anyone can view published testimonials" ON testimonials
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage testimonials" ON testimonials
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- ====================================
-- FUNCTIONS & TRIGGERS
-- ====================================

-- Funktion: Update updated_at Timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger für bookings
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger für coaching_sessions
CREATE TRIGGER update_coaching_sessions_updated_at
  BEFORE UPDATE ON coaching_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ====================================
-- INITIAL DATA (Admin User)
-- ====================================

-- Erstelle Admin-User (Tom)
-- WICHTIG: Ersetze 'your-auth-id-here' mit der Auth-ID nach Registrierung
INSERT INTO users (email, role, full_name)
VALUES
  ('admin@bandstage-pro.de', 'admin', 'Tom - BandStage Pro'),
  ('michael@bandstage-pro.de', 'admin', 'Michael - BandStage Pro');

-- Beispiel Testimonials (für Testing)
INSERT INTO testimonials (band_name, text, rating, coaching_level, is_published)
VALUES
  ('The Soundwaves', 'Mega professionelles Coaching! Wir haben in 4 Stunden mehr gelernt als in 2 Jahren selbst rumprobieren.', 5, 'rookie', true),
  ('Electric Dreams', 'Top Team, super Equipment und endlich verstehen wir unseren Live-Sound. Absolute Empfehlung!', 5, 'intermediate', true),
  ('Bass & Beats', 'Das Advanced-Coaching war jeden Euro wert. Jetzt klingen wir live wie auf der Platte!', 5, 'advanced', true);
```

### 3. Environment Variables setzen

Erstelle eine `.env.local` Datei im Root-Verzeichnis:

```env
REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGc...
```

### 4. Testing der Verbindung

Nach Installation der Dependencies kannst du die Verbindung testen:

```javascript
import { supabase } from './services/supabase';

// Test Query
const { data, error } = await supabase
  .from('bookings')
  .select('*')
  .limit(5);

console.log('Bookings:', data);
```

### 5. Wichtige Hinweise

- **RLS ist aktiviert**: Nur authentifizierte Admins können Daten lesen/schreiben
- **Für Testing**: Temporär RLS deaktivieren oder Admin-User mit Supabase Auth erstellen
- **Stripe Webhooks**: Später Webhook-Handler erstellen für automatische Payment-Updates
- **Backup**: Supabase erstellt automatisch Backups, zusätzlich täglich Export empfohlen

## 📊 Datenbank-Struktur

```
bookings
├── id (UUID, PK)
├── band_name (VARCHAR)
├── email (VARCHAR)
├── phone (VARCHAR)
├── level (VARCHAR)
├── preferred_date (DATE)
├── status (VARCHAR)
└── created_at (TIMESTAMP)

users
├── id (UUID, PK)
├── email (VARCHAR, UNIQUE)
├── auth_id (UUID)
├── role (VARCHAR)
└── full_name (VARCHAR)

coaching_sessions
├── id (UUID, PK)
├── booking_id (UUID, FK → bookings)
├── coach_id (UUID, FK → users)
├── session_date (DATE)
├── notes (TEXT)
└── status (VARCHAR)

payments
├── id (UUID, PK)
├── booking_id (UUID, FK → bookings)
├── amount (DECIMAL)
├── stripe_payment_id (VARCHAR)
└── status (VARCHAR)

testimonials
├── id (UUID, PK)
├── band_name (VARCHAR)
├── text (TEXT)
├── rating (INTEGER)
└── is_published (BOOLEAN)
```

## ✅ Setup Complete!

Nach Ausführung dieser Schritte ist die Datenbank bereit für die React-Integration.
