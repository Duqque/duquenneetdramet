import { CTA } from '@/components/Arrow';
export default function NotFound() {
  return (
    <section className="section">
      <h1 className="display xl">Cette page<br />n’existe pas.</h1>
      <p className="lead" style={{ margin: '4vh 0' }}>Mais il reste beaucoup à changer.</p>
      <div><CTA href="/">Retour à l’accueil</CTA></div>
    </section>
  );
}
