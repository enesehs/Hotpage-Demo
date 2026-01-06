import React from 'react';
import { FloatingHeader } from './components/FloatingHeader';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ManifestoSection } from './components/ManifestoSection';
import { VideoShowcase } from './components/VideoShowcase';
import { TargetAudience } from './components/TargetAudience';
import { FAQ } from './components/FAQ';
import { CursorGlow } from './components/CursorGlow';
import { Footer } from './components/Footer';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AnimatedBackground } from './components/AnimatedBackground';
import { LanguageProvider } from './i18n/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen relative overflow-x-hidden text-white font-sans selection:bg-indigo-500 selection:text-white noise-overlay">
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Cursor Glow Effect */}
        <CursorGlow />

        {/* Floating Header */}
        <FloatingHeader />

        {/* Hero Section */}
        <HeroSection />

        {/* Video (HOW?) - Moved up as requested */}
        <VideoShowcase />

        {/* Features (WHAT?) - Bento Grid details */}
        <FeaturesSection />

        {/* Manifesto (WHY?) - Comparison */}
        <ManifestoSection />

        {/* Audience (WHO?) - Personas */}
        <TargetAudience />

        {/* Testimonials (TRUST) */}
        <TestimonialsSection />

        {/* FAQ (DOUBTS?) */}
        <FAQ />

        {/* Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
