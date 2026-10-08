/** Signe D&D : étoile à 4 branches (repère « signal »). */
export function Mark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 1v22M1 12h22M4.2 4.2l15.6 15.6M19.8 4.2 4.2 19.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
