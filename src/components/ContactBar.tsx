import { Button } from './Button';

export interface ContactBarProps {
  /** E.164 number for tel: */
  tel: string;
  /** wa.me number, digits only */
  whatsapp: string;
  /** Optional third "Enquire" button (a link to the enquiry page) */
  enquireHref?: string;
  /** Which button gets sun yellow. Default 'none' so the page's own main button keeps the sun */
  primary?: 'none' | 'call' | 'whatsapp' | 'enquire';
  /** position: fixed to viewport bottom (default true) */
  fixed?: boolean;
  className?: string;
}

/** Sticky bottom bar: Call + WhatsApp, always visible on phones and tablets. */
export function ContactBar({ tel, whatsapp, enquireHref, primary = 'none', fixed = true, className }: ContactBarProps) {
  const v = (k: 'call' | 'whatsapp' | 'enquire') => (primary === k ? 'primary' : k === 'call' ? 'outline' : 'secondary');
  return (
    <div className={['a-contactbar', fixed && 'a-contactbar--fixed', className].filter(Boolean).join(' ')}>
      <Button variant={v('call')} size="md" iconLeft="phone" href={'tel:' + tel} className="a-contactbar__btn">Call</Button>
      <Button variant={v('whatsapp')} size="md" iconLeft="whatsapp" href={'https://wa.me/' + whatsapp} className="a-contactbar__btn">WhatsApp</Button>
      {enquireHref && <Button variant={v('enquire')} size="md" iconLeft="mail" href={enquireHref} className="a-contactbar__btn">Enquire</Button>}
    </div>
  );
}
