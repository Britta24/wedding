import { useState } from 'react';
import { Copy, MapPin } from 'lucide-react';
import { weddingConfig as cfg } from '../data/weddingConfig';
import { copyText } from '../utils/share';
import Reveal from './Reveal';
import Divider from './Divider';

// One venue block: label, name, address, Maps + Copy buttons, optional embedded map.
function VenueBlock({ label, name, address, mapsLink, mapsEmbedUrl }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (await copyText(`${name}, ${address}`)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Reveal>
      <p
        className="section__lead"
        style={{ textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.8rem', marginBottom: '0.25rem', opacity: 0.8 }}
      >
        {label}
      </p>
      <h3 className="venue__name">{name}</h3>
      <p className="section__lead">{address}</p>
      <div className="btn-row btn-row--center">
        <a className="btn btn--maroon btn--big" href={mapsLink} target="_blank" rel="noopener noreferrer">
          <MapPin size={20} aria-hidden="true" /> Open in Google Maps
        </a>
        <button type="button" className="btn btn--ghost" onClick={copy} aria-live="polite">
          <Copy size={18} aria-hidden="true" /> {copied ? 'Address copied' : 'Copy address'}
        </button>
      </div>
      {mapsEmbedUrl && (
        <iframe className="venue__map" title={`Map of ${name}`} src={mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      )}
    </Reveal>
  );
}

export default function Venue() {
  const church = cfg.venue;
  const hall = cfg.reception;

  return (
    <section className="section section--cream" aria-labelledby="venue-title">
      <Divider />
      <Reveal>
        <h2 id="venue-title" className="section__title script">The Venue</h2>
      </Reveal>

      <VenueBlock
        label={cfg.wedding.title}
        name={church.name}
        address={church.address}
        mapsLink={church.mapsLink}
        mapsEmbedUrl={church.mapsEmbedUrl}
      />

      {hall.venueName && (
        <>
          <Divider />
          <VenueBlock
            label={hall.title}
            name={hall.venueName}
            address={hall.address}
            mapsLink={hall.mapsLink}
            mapsEmbedUrl={hall.mapsEmbedUrl}
          />
        </>
      )}
    </section>
  );
}