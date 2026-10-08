import type { Metadata } from 'next';
import { Lines } from '@/components/Lines';
import { Booking } from '@/components/Booking';

export const metadata: Metadata = {
  title: 'Parlons-nous',
  description: 'Lancez une conversation avec D&D : choisissez le sujet, la durée et un créneau.',
  alternates: { canonical: '/parlons-nous' },
};

export default function Parlons() {
  return (
    <section className="sec halo-soft" style={{ paddingTop: 'clamp(140px, 22vh, 220px)' }}>
      <span className="tag dot sky" data-fade>Parlons-nous</span>
      <Lines as="h1" className="h-hero mt-m" lines={['Et vous ?']} />
      <Lines className="h-lg w-l mt-s ghost" lines={['Qu’aimeriez-vous changer ?']} />
      <div className="mt-l" style={{ maxWidth: 1100 }}><Booking /></div>
    </section>
  );
}
