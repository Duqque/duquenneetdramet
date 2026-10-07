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
    <>
      <section className="section tight" style={{ paddingTop: '22vh' }}>
        <Lines as="h1" className="display xl" lines={['Et vous ?', 'Qu’aimeriez-vous', 'changer ?']} />
      </section>
      <section className="section tight"><Booking /></section>
    </>
  );
}
