import { Phone } from 'lucide-react';
import { weddingConfig as cfg } from '../data/weddingConfig';
import Reveal from './Reveal';
import Divider from './Divider';

export default function Contact() {
  return (
    <section className="section section--cream" aria-labelledby="contact-title">
      <Divider />
      <Reveal>
        <h2 id="contact-title" className="section__title script">Need help finding us?</h2>
        <p className="section__lead">Call us to find us </p>
        <ul className="contacts">
          {cfg.contacts.map((c) => (
            <li key={c.label} className="card contacts__item">
              <p className="contacts__label">{c.label}</p>
              <p className="contacts__name">{c.name}</p>
              <a className="btn btn--gold" href={`tel:${c.phone}`} aria-label={`Call ${c.name}, ${c.label}`}>
                <Phone size={18} aria-hidden="true" /> {c.phone}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
