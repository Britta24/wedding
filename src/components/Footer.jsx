import { useState } from 'react';
import { MessageCircle, Share2 } from 'lucide-react';
import { weddingConfig as cfg } from '../data/weddingConfig';
import { shareInvitation, whatsappShareUrl } from '../utils/share';
import Reveal from './Reveal';

export default function Footer() {
  const [status, setStatus] = useState('');
  const title = `${cfg.groom.name} & ${cfg.bride.name} | Wedding Invitation`;
  const text = `You are invited to the wedding of ${cfg.groom.name} & ${cfg.bride.name}.`;

  const share = async () => {
    const result = await shareInvitation({ title, text, url: cfg.siteUrl });
    if (result === 'copied') setStatus('Link copied. Paste it anywhere to share.');
    else if (result === 'failed') setStatus('');
    if (result === 'copied') setTimeout(() => setStatus(''), 3000);
  };

  return (
    <footer className="section section--dark footer">
      <Reveal>
        <h2 className="section__title script">Thank you</h2>
        <p className="section__lead">Your presence and blessings will make our day complete.</p>
        <p className="footer__tag">{cfg.hashtag}</p>
        <div className="btn-row btn-row--center">
          <button type="button" className="btn btn--gold" onClick={share}>
            <Share2 size={18} aria-hidden="true" /> Share this invitation
          </button>
          <a className="btn btn--ghost-light" href={whatsappShareUrl(text, cfg.siteUrl)} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={18} aria-hidden="true" /> WhatsApp
          </a>
        </div>
        <p className="footer__status" role="status">{status}</p>
      </Reveal>
    </footer>
  );
}
