import type { NewBooking } from './booking';

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const fmt = (iso: string) =>
  new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', dateStyle: 'full', timeStyle: 'short' }).format(new Date(iso));

/** Gabarit e-mail aux couleurs D&D (polices système : Geomini n'est pas fiable en e-mail). */
function layout(title: string, body: string) {
  return `<!doctype html><html lang="fr"><body style="margin:0;background:#f7f7f5;color:#0b0b0c;font-family:Helvetica,Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:48px 20px;background:#f7f7f5">
<table width="560" style="max-width:560px"><tr><td>
<div style="font-weight:800;font-size:28px;letter-spacing:-1px">D&amp;D</div>
<h1 style="font-size:36px;font-weight:500;letter-spacing:-1.5px;line-height:1;margin:40px 0 24px;color:#0b0b0c">${title}</h1>
<div style="font-size:16px;line-height:1.6;color:#222224">${body}</div>
<div style="margin-top:48px;border-top:1px solid rgba(0,0,0,.08);padding-top:16px;font-size:12px;color:#888">Duquenne &amp; Dramet Consulting — <span style="color:#4c22ff">De l’intuition au mouvement.</span></div>
</td></tr></table></td></tr></table></body></html>`;
}

export function confirmationEmail(b: NewBooking) {
  return {
    template: 'booking_confirmation',
    to: b.email,
    subject: 'Votre conversation avec D&D est confirmée',
    html: layout('C’est noté.', `<p>Bonjour ${esc(b.firstName)},</p><p>Nous échangeons le <strong style="color:#4c22ff">${esc(fmt(b.startsAt))}</strong> (${b.duration} min, heure de Paris).</p><p>Sujet : ${esc(b.reason)}.</p>`),
  };
}

export function adminNotificationEmail(b: NewBooking) {
  return {
    template: 'booking_admin_notification',
    to: process.env.ADMIN_NOTIFY_EMAIL ?? '',
    subject: `Nouvelle réservation — ${b.firstName} ${b.lastName}`,
    html: layout('Nouvelle réservation', `<p>${esc(b.firstName)} ${esc(b.lastName)}${b.company ? ` (${esc(b.company)})` : ''} — ${esc(b.email)}</p><p>${esc(fmt(b.startsAt))} · ${b.duration} min · ${esc(b.reason)}</p>${b.message ? `<p>${esc(b.message)}</p>` : ''}`),
  };
}
