import { CTA } from '@/components/Arrow';
export default function NotFound() {
  return (
    <section className="sec full halo-soft" style={{ justifyContent: 'center' }}>
      <span className="tag dot sky">404</span>
      <h1 className="h-xl mt-m">Cette page<br /><span className="ghost">n’existe pas.</span></h1>
      <p className="lead mt-m">Mais il reste beaucoup à changer.</p>
      <div className="mt-l"><CTA href="/">Retour à l’accueil</CTA></div>
    </section>
  );
}
