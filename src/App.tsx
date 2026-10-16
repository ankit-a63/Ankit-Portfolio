import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { SmoothScroll } from './components/SmoothScroll';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PinnedPhilosophy } from './components/PinnedPhilosophy';
import { HorizontalProjects } from './components/HorizontalProjects';
import { InteractiveSkills } from './components/InteractiveSkills';
import { ContactSection } from './components/ContactSection';
import { Scrollytelling3D } from './components/Scrollytelling3D';
import { ScrollHUD } from './components/ScrollHUD';
import { AudioAmbient } from './components/AudioAmbient';
import { Footer } from './components/Footer';

export const AppContent: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const toggleSound = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#070709] text-zinc-100 selection:bg-accent-cyan selection:text-black font-sans">
        {/* Interactive Custom Cursor for Pointer Devices */}
        <CustomCursor />

        {/* Global Fixed Full-Page Scrollytelling 3D WebGL Canvas */}
        <Scrollytelling3D />

        {/* Cybernetic Scroll HUD & Chapter Progress Rail */}
        <ScrollHUD />

        {/* Ambient Audio Synthesizer */}
        <AudioAmbient isPlaying={isAudioPlaying} />

        {/* Cinematic Preloader with Counter and Monogram */}
        {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

        {/* Global Navigation Header */}
        <Navbar
          isMuted={!isAudioPlaying}
          onToggleSound={toggleSound}
        />

        {/* Main Semantic Scrollytelling Flow */}
        <main className="relative z-10">
          <HeroSection />
          <PinnedPhilosophy />
          <HorizontalProjects />
          <InteractiveSkills />
          <ContactSection />
        </main>

        {/* Closing Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
