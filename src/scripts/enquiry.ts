// Progressive enhancement for the enquiry form. Without this script the form still sends:
// the browser checks the required fields and Netlify shows /thanks.
import { MESSAGES, SERVICES, validateEnquiry, type EnquiryField, type EnquiryValues } from '../data/enquiry';

const form = document.querySelector<HTMLFormElement>('#enquiry-form');
if (form) enhance(form);

function enhance(form: HTMLFormElement) {
  form.noValidate = true; // we show the design system's messages instead of the browser's
  const formError = form.querySelector<HTMLElement>('#form-error')!;
  const sendError = form.querySelector<HTMLElement>('#send-error')!;
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const errorIcon = document.querySelector<HTMLTemplateElement>('#icon-error')!;
  let tried = false;

  // Pick the service a link asked about, e.g. /enquiry?service=farm
  const wanted = new URLSearchParams(location.search).get('service');
  if (wanted && (SERVICES as readonly string[]).includes(wanted)) {
    const radio = form.querySelector<HTMLInputElement>(`input[name="service"][value="${wanted}"]`);
    if (radio && !form.querySelector('input[name="service"]:checked')) radio.checked = true;
  }

  // Remember each field's hint so it comes back once the field is fixed
  const msgEl = (f: EnquiryField) => document.getElementById(`${f}-msg`)!;
  const hints = new Map<EnquiryField, string>();
  for (const f of Object.keys(MESSAGES) as EnquiryField[]) hints.set(f, msgEl(f).textContent ?? '');

  const values = (): EnquiryValues => {
    const d = new FormData(form);
    const s = (k: string) => String(d.get(k) ?? '');
    return { service: s('service'), name: s('name'), phone: s('phone'), problem: s('problem') };
  };

  function show(bad: EnquiryField[]) {
    for (const f of Object.keys(MESSAGES) as EnquiryField[]) {
      const isBad = bad.includes(f);
      const msg = msgEl(f);
      const hint = hints.get(f) ?? '';
      if (isBad) {
        msg.replaceChildren(errorIcon.content.cloneNode(true), MESSAGES[f]);
        msg.className = 'a-field__msg a-field__msg--error';
        msg.hidden = false;
      } else {
        msg.replaceChildren(hint);
        msg.className = 'a-field__msg a-field__msg--hint';
        msg.hidden = !hint;
      }
      if (f === 'service') {
        const set = form.querySelector<HTMLFieldSetElement>('fieldset.a-picker')!;
        set.classList.toggle('a-picker--error', isBad);
        if (isBad) set.setAttribute('aria-describedby', msg.id); else set.removeAttribute('aria-describedby');
        form.querySelectorAll<HTMLInputElement>('input[name="service"]').forEach(r => r.toggleAttribute('aria-invalid', isBad));
      } else {
        const input = document.getElementById(f)!;
        input.classList.toggle('a-input--error', isBad);
        if (isBad) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
        input.setAttribute('aria-describedby', msg.id);
      }
    }
    formError.hidden = bad.length === 0;
  }

  // After the first attempt, update messages as the visitor fixes things
  const recheck = () => { if (tried) show(validateEnquiry(values())); };
  form.addEventListener('change', recheck);
  form.addEventListener('focusout', recheck);

  form.addEventListener('submit', async event => {
    event.preventDefault();
    tried = true;
    sendError.hidden = true;
    const bad = validateEnquiry(values());
    show(bad);
    if (bad.length) {
      formError.focus();
      formError.scrollIntoView({ block: 'center' });
      return;
    }

    setSending(true);
    try {
      const body = new URLSearchParams();
      new FormData(form).forEach((v, k) => body.append(k, String(v)));
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      location.assign(form.action);
    } catch {
      setSending(false);
      sendError.hidden = false;
      sendError.focus();
    }
  });

  function setSending(on: boolean) {
    submit.disabled = on;
    submit.setAttribute('aria-busy', String(on));
    submit.lastChild && submit.childNodes.forEach(n => {
      if (n.nodeType === Node.TEXT_NODE && n.textContent?.trim()) n.textContent = on ? 'Sending…' : 'Send enquiry';
    });
  }
}
