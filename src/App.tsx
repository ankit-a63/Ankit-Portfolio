import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WorkShowcase } from './components/WorkShowcase';
import { AboutJourney } from './components/AboutJourney';
import { InteractiveSkills } from './components/InteractiveSkills';
import { ContactSection } from './components/ContactSection';
import { AudioAmbient } from './components/AudioAmbient';
import { Footer } from './components/Footer';

export const AppContent: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const toggleSound = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-[#070709] text-zinc-100 selection:bg-accent-cyan selection:text-black font-sans">
      {/* Interactive Custom Cursor for Pointer Devices */}
      <CustomCursor />

      {/* Ambient Audio Synthesizer */}
      <AudioAmbient isPlaying={isAudioPlaying} />

      {/* Cinematic Preloader with Counter and Monogram */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Global Navigation Header */}
      <Navbar
        isMuted={!isAudioPlaying}
        onToggleSound={toggleSound}
      />

      {/* Main Semantic Flow */}
      <main>
        <HeroSection />
        <WorkShowcase />
        <AboutJourney />
        <InteractiveSkills />
        <ContactSection />
      </main>

      {/* Closing Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
