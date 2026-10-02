import { Volume2, VolumeX } from 'lucide-react';

export default function MusicButton({ playing, onToggle }) {
  return (
    <button
      type="button"
      className="music-btn icon-btn"
      onClick={onToggle}
      aria-label={playing ? 'Mute music' : 'Play music'}
      aria-pressed={playing}
    >
      {playing ? <Volume2 size={22} /> : <VolumeX size={22} />}
    </button>
  );
}
