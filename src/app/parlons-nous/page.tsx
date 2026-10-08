import type { Metadata } from 'next';
import { Booking } from '@/components/Booking';

export const metadata: Metadata = {
  title: 'Parlons-nous',
  description: 'Lancez une conversation avec D&D : choisissez le sujet, la durée et un créneau.',
  alternates: { canonical: '/parlons-nous' },
};

export default function Parlons() {
  return (
    <>
      <section className="ed p-head">
        <div className="in intro-ed">
          <p className="micro lbl" data-fade>Parlons-nous ↘</p>
          <h1 className="h1" data-fade>Et vous ?<br /><em>Qu’aimeriez-vous changer ?</em></h1>
          <p className="micro side" data-fade>Un sujet, une durée, un créneau. Réservation directe, confirmation par e-mail.</p>
        </div>
      </section>
      <section className="ed" style={{ paddingBottom: 'var(--section)' }}>
        <div className="in"><Booking /></div>
      </section>
    </>
  );
}
