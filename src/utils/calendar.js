// Date helpers + "Add to Calendar" (.ics download and Google Calendar link).

const toDate = (date, time, offset) => new Date(`${date}T${time}:00${offset}`);
const stamp = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, '');

export const formatDate = (date, options) =>
  new Intl.DateTimeFormat('en-IN', { ...options, timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));

export const formatTime = (time) => {
  const [h, m] = time.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
};

export const eventStart = (ev) => `${ev.date}T${ev.startTime}:00${ev.timezoneOffset}`;

const details = (ev, venue) => ({
  title: ev.title,
  start: stamp(toDate(ev.date, ev.startTime, ev.timezoneOffset)),
  end: stamp(toDate(ev.date, ev.endTime, ev.timezoneOffset)),
  location: `${venue.name}, ${venue.address}`
});

export function googleCalendarUrl(ev, venue) {
  const d = details(ev, venue);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: d.title,
    dates: `${d.start}/${d.end}`,
    location: d.location,
    details: 'You are invited! Join us to celebrate.'
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export function downloadIcs(ev, venue) {
  const d = details(ev, venue);
  const esc = (s) => s.replace(/([,;])/g, '\\$1');
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Wedding Invitation//EN', 'BEGIN:VEVENT',
    `UID:${d.start}-${Math.random().toString(36).slice(2)}@wedding-invite`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${d.start}`, `DTEND:${d.end}`,
    `SUMMARY:${esc(d.title)}`, `LOCATION:${esc(d.location)}`,
    'DESCRIPTION:You are invited! Join us to celebrate.',
    'END:VEVENT', 'END:VCALENDAR'
  ];
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${ev.title.replace(/\s+/g, '-').toLowerCase()}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
