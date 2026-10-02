import { CalendarPlus, Flower2, PartyPopper } from 'lucide-react';
import { weddingConfig as cfg } from '../data/weddingConfig';
import { downloadIcs, formatDate, formatTime, googleCalendarUrl } from '../utils/calendar';
import Reveal from './Reveal';
import Divider from './Divider';

const EVENTS = [
  { key: 'wedding', Icon: Flower2 },
  { key: 'reception', Icon: PartyPopper }
];

// Each event can have its own venue. The reception uses cfg.reception.venueName / address / mapsLink;
// the wedding ceremony uses cfg.venue (the church).
function getPlace(key) {
  if (key === 'reception' && cfg.reception.venueName) {
    return {
      ...cfg.venue,
      name: cfg.reception.venueName,
      address: cfg.reception.address || cfg.venue.address,
      mapsLink: cfg.reception.mapsLink || cfg.venue.mapsLink
    };
  }
  return cfg.venue;
}

export default function Events() {
  return (
    <section className="section" aria-labelledby="events-title">
      <Divider />
      <Reveal><h2 id="events-title" className="section__title script">Celebrations</h2></Reveal>
      <ol className="timeline">
        {EVENTS.map(({ key, Icon }, i) => {
          const ev = cfg[key];
          const place = getPlace(key);
          return (
            <li key={key} className="timeline__item">
              <span className="timeline__dot" aria-hidden="true"><Icon size={20} /></span>
              <Reveal delay={i * 0.1} className="card timeline__card">
                <h3 className="timeline__title">{ev.title}</h3>
                <p className="timeline__when">
                  {formatDate(ev.date, { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="timeline__time">{formatTime(ev.startTime)} – {formatTime(ev.endTime)}</p>
                <p className="timeline__where">{place.name}</p>
                <div className="btn-row">
                  <button type="button" className="btn btn--gold" onClick={() => downloadIcs(ev, place)}>
                    <CalendarPlus size={18} aria-hidden="true" /> Add to Calendar
                  </button>
                  <a className="btn btn--ghost" href={googleCalendarUrl(ev, place)} target="_blank" rel="noopener noreferrer">
                    Google Calendar
                  </a>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}