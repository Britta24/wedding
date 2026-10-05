import { useState } from 'react';
import { Send } from 'lucide-react';
import { weddingConfig as cfg } from '../data/weddingConfig';
import { formatDate } from '../utils/calendar';
import Reveal from './Reveal';
import Divider from './Divider';

const INITIAL = { name: '', attending: 'yes', message: '' };

export default function Rsvp() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = 'Please enter your name.';
    setErrors(next);
    if (Object.keys(next).length) return;

    const lines = [
      `Hello! This is ${form.name.trim()}.`,
      form.attending === 'yes'
        ? 'I will attend the wedding.'
        : 'Sadly, I will not be able to attend, but I send my blessings.'
    ];
    if (form.message.trim()) lines.push(`Message: ${form.message.trim()}`);
    window.open(`https://wa.me/${cfg.rsvp.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  };

  return (
    <section className="section" aria-labelledby="rsvp-title">
      <Divider />
      <Reveal>
        <h2 id="rsvp-title" className="section__title script">Will you join us?</h2>
        <p className="section__lead">
          Save your seat at our celebration! Reply on or before {formatDate(cfg.rsvp.deadline, { day: 'numeric', month: 'long' })}, it takes just one tap on WhatsApp.
        </p>
        <form className="card form" onSubmit={submit} noValidate>
          <label className="field">
            <span>Your name</span>
            <input type="text" value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} aria-describedby="err-name" />
            <small id="err-name" className="field__error" role="alert">{errors.name}</small>
          </label>

          <fieldset className="field">
            <legend>Will you attend?</legend>
            <div className="pills">
              {[['yes', 'Joyfully yes'], ['no', 'Cannot make it']].map(([value, label]) => (
                <label key={value} className={`pill${form.attending === value ? ' is-on' : ''}`}>
                  <input type="radio" name="attending" value={value} checked={form.attending === value} onChange={set('attending')} />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="field">
            <span>Message for the couple (optional)</span>
            <textarea rows="3" value={form.message} onChange={set('message')} />
          </label>

          <button type="submit" className="btn btn--maroon btn--big">
            <Send size={18} aria-hidden="true" /> Send on WhatsApp
          </button>
        </form>
      </Reveal>
    </section>
  );
}