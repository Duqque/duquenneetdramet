import { Btn } from '@/components/Arrow';
export default function NotFound() {
  return (
    <section className="ed p-head" style={{ minHeight: '80svh' }}>
      <div className="in intro-ed">
        <p className="micro lbl">404 ↘</p>
        <h1 className="h1">Cette page n’existe pas.<br /><em>Mais il reste beaucoup à changer.</em></h1>
        <div className="side"><Btn href="/">Retour à l’accueil</Btn></div>
      </div>
    </section>
  );
}
