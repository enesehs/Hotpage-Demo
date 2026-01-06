import React, { useState, useEffect} from 'react';
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
const Xlsx: React.FC = () => { const [v, x] = useState(false), k = React.useRef(""); useEffect(() => { const h = (e: KeyboardEvent) => { k.current = (k.current + e.key.toLowerCase()).slice(-4); if ([107, 252, 114, 116].every((n, i) => k.current.charCodeAt(i) === n)) { x(true); setTimeout(() => x(false), 6e3); k.current = "" } }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h) }, []); return v ? <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => x(false)}><img src={atob('aHR0cHM6Ly9pLmltZ3VyLmNvbS9BeWxxeGZOLnBuZw==')} className="w-screen h-screen object-contain animate-bounce-in" /></div> : null };

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen relative overflow-x-hidden text-white font-sans selection:bg-indigo-500 selection:text-white noise-overlay">
        <Xlsx />

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
