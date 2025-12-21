import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="text-center max-w-4xl">
        {/* Logo/Header */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent">
              BandStage Pro
            </span>
          </h1>
          <h2 className="text-2xl text-gray-300 font-light">
            Regensburg
          </h2>
        </div>

        {/* Status Message */}
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse mr-3"></div>
            <span className="text-success font-semibold text-lg">Backend Setup Complete</span>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">
            Phase 2 Backend-Integration ist bereit! 🚀
          </p>
        </div>

        {/* Feature Checklist */}
        <div className="bg-dark/50 border border-gray-700 rounded-xl p-8 text-left">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <span className="text-2xl mr-3">✅</span>
            Bereits implementiert:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <FeatureItem icon="📦" text="Projektstruktur erstellt" />
            <FeatureItem icon="🗄️" text="Supabase Setup dokumentiert" />
            <FeatureItem icon="💳" text="Stripe Integration vorbereitet" />
            <FeatureItem icon="📧" text="SendGrid Email Templates" />
            <FeatureItem icon="🔧" text="API Services implementiert" />
            <FeatureItem icon="🎨" text="Tailwind CSS konfiguriert" />
            <FeatureItem icon="📋" text="Constants & Config" />
            <FeatureItem icon="🔐" text="Environment Setup" />
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 p-6 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl border border-accent/30">
          <h3 className="text-lg font-semibold text-accent mb-3">
            🚀 Nächste Schritte:
          </h3>
          <ol className="text-left text-gray-300 space-y-2 text-sm">
            <li>1. <code className="bg-dark px-2 py-1 rounded text-accent">npm install</code> - Dependencies installieren</li>
            <li>2. Supabase Projekt erstellen (siehe SUPABASE_SETUP.md)</li>
            <li>3. <code className="bg-dark px-2 py-1 rounded text-accent">.env.local</code> mit API-Keys erstellen</li>
            <li>4. Frontend-Components entwickeln (Hero, LevelFinder, BookingForm, etc.)</li>
            <li>5. Admin-Dashboard implementieren</li>
          </ol>
        </div>

        {/* Tech Stack */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <TechBadge>React</TechBadge>
          <TechBadge>Supabase</TechBadge>
          <TechBadge>Stripe</TechBadge>
          <TechBadge>SendGrid</TechBadge>
          <TechBadge>Tailwind CSS</TechBadge>
          <TechBadge>Framer Motion</TechBadge>
        </div>

        {/* Footer */}
        <div className="mt-12 text-gray-500 text-sm">
          <p>BandStage Pro Regensburg | Phase 2 - Backend Integration</p>
          <p className="mt-2">Live sound engineering platform 🎸</p>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function FeatureItem({ icon, text }) {
  return (
    <div className="flex items-center text-gray-300">
      <span className="text-xl mr-3">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function TechBadge({ children }) {
  return (
    <span className="px-4 py-2 bg-dark border border-gray-700 rounded-full text-sm text-gray-300 font-medium hover:border-primary hover:text-primary transition-colors">
      {children}
    </span>
  );
}

export default App;
