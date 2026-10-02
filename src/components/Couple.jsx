import { Heart } from 'lucide-react';
import { weddingConfig as cfg } from '../data/weddingConfig';
import Reveal from './Reveal';
import Divider from './Divider';

export default function Couple() {
  const people = [
    { role: 'The Groom', ...cfg.groom },
    { role: 'The Bride', ...cfg.bride }
  ];
  return (
    <section className="section" aria-labelledby="couple-title">
      <Divider />
      <Reveal>
        <h2 id="couple-title" className="section__title script">Two families, one celebration</h2>
        <p className="section__lead">{cfg.tagline}</p>
      </Reveal>
      <div className="couple">
        {people.map((p, i) => (
          <Reveal key={p.role} delay={i * 0.15} className="card couple__card">
            <span className="couple__initial script" aria-hidden="true">{p.name[0]}</span>
            <p className="couple__role">{p.role}</p>
            <h3 className="couple__name">{p.name}</h3>
            <p className="couple__parents">{p.parents}</p>
          </Reveal>
        ))}
        <Heart className="couple__heart" size={28} fill="currentColor" aria-hidden="true" />
      </div>
    </section>
  );
}
