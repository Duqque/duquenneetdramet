import type { RowDataPacket } from 'mysql2/promise';
import { getPool } from './db';
import { CASES, DOMAINS, type Case, type Domain } from '@/content/cases';

const isDomain = (d: unknown): d is Domain => DOMAINS.includes(d as Domain);

/**
 * Cas actifs : table `cases` si une base est configurée et non vide, sinon la bibliothèque
 * versionnée dans src/content/cases.ts. Le front-end ne dépend que de ce tableau.
 */
export async function getCases(): Promise<Case[]> {
  const pool = getPool();
  if (pool) {
    try {
      const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM cases WHERE active = 1');
      if (rows.length) {
        return rows
          .filter((r) => isDomain(r.category))
          .map((r) => ({
            id: r.id,
            title: r.title,
            organization: r.organization,
            year: r.year,
            category: r.category,
            secondary_categories: (typeof r.secondary_categories === 'string' ? JSON.parse(r.secondary_categories) : r.secondary_categories ?? []).filter(isDomain),
            problem: r.problem,
            solution: r.solution,
            impact: r.impact,
            dd_lens: r.dd_lens,
            image: r.image,
            source_name: r.source_name,
            source_url: r.source_url,
            order: r.sort_order,
            active: true,
          }));
      }
    } catch {
      // Base indisponible : on retombe sur la bibliothèque statique.
    }
  }
  return CASES.filter((c) => c.active);
}
