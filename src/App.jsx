import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { weddingConfig as cfg } from './data/weddingConfig';
import Splash from './components/Splash';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Couple from './components/Couple';
import Engagement from './components/Engagement';
import Events from './components/Events';
import Venue from './components/Venue';
import Rsvp from './components/Rsvp';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MusicButton from './components/MusicButton';

export default function App() {
  const audioRef = useRef(null);
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioOk, setAudioOk] = useState(true);

  // Lock scrolling while the envelope is showing.
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
    if (opened) window.scrollTo(0, 0);
  }, [opened]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); // autoplay may be blocked
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) play();
    else { audio.pause(); setPlaying(false); }
  }, [play]);

  const handleOpen = () => {
    setOpened(true);
    if (cfg.music.autoplayOnOpen) play(); // runs inside the user's tap, so mobile allows it
  };

  return (
    <div className="shell">
      <audio ref={audioRef} src={cfg.music.src} loop preload="none" onError={() => setAudioOk(false)} />
      <AnimatePresence>{!opened && <Splash key="splash" onOpen={handleOpen} />}</AnimatePresence>

      <main className="invite">
        <Hero />
        <Countdown />
        <Couple />
        <Engagement />
        <Events />
        <Venue />
        <Rsvp />
        <Contact />
        <Footer />
      </main>

      {opened && audioOk && <MusicButton playing={playing} onToggle={toggleMusic} />}
    </div>
  );
}
