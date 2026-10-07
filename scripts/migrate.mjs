// Applique db/schema.sql sur DATABASE_URL (idempotent : CREATE TABLE IF NOT EXISTS).
import { readFileSync } from 'node:fs';
import mysql from 'mysql2/promise';

const url = process.env.DATABASE_URL;
if (!url) { console.error('DATABASE_URL manquant'); process.exit(1); }
const conn = await mysql.createConnection({ uri: url, multipleStatements: true });
await conn.query(readFileSync(new URL('../db/schema.sql', import.meta.url), 'utf8'));
await conn.end();
console.log('Schéma appliqué.');
