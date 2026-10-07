import mysql, { type Pool } from 'mysql2/promise';

let pool: Pool | null | undefined;

/** Pool MySQL côté serveur uniquement. La base n'est jamais joignable depuis le navigateur. */
export function getPool(): Pool | null {
  if (pool !== undefined) return pool;
  const url = process.env.DATABASE_URL;
  pool = url ? mysql.createPool({ uri: url, connectionLimit: 10, timezone: 'Z', dateStrings: false }) : null;
  return pool;
}
