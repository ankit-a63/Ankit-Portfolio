import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { SmoothScroll } from './components/SmoothScroll';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { SpatialCanvas } from './components/SpatialCanvas';
import { SpatialHUD } from './components/SpatialHUD';
import { SectorHero } from './components/SectorHero';
import { SectorStory } from './components/SectorStory';
import { SectorProjects } from './components/SectorProjects';
import { SectorSkills } from './components/SectorSkills';
import { SectorContact } from './components/SectorContact';
import { AudioAmbient } from './components/AudioAmbient';
import { Footer } from './components/Footer';

export const AppContent: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [scrollVelocity, setScrollVelocity] = useState(0);

  const toggleSound = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#050508] text-zinc-100 selection:bg-accent-cyan selection:text-black font-sans overflow-x-hidden">
        {/* Interactive Custom Cursor */}
        <CustomCursor />

        {/* 3D Spatial Fly-Through & Warp Starfield Engine */}
        <SpatialCanvas onVelocityChange={setScrollVelocity} />

        {/* Cybernetic Cockpit Telemetry HUD & Waypoints */}
        <SpatialHUD
          velocity={scrollVelocity}
          isMuted={!isAudioPlaying}
          onToggleSound={toggleSound}
        />

        {/* Ambient Web Audio Synthesizer */}
        <AudioAmbient isPlaying={isAudioPlaying} />

        {/* Cinematic Preloader */}
        {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

        {/* Spatial 3D Waypoint Sectors */}
        <main className="relative z-10">
          <SectorHero />
          <SectorStory />
          <SectorProjects />
          <SectorSkills />
          <SectorContact />
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
