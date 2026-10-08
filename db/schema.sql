-- D&D Consulting — schéma initial (MySQL 8, utf8mb4). Architecture évolutive.
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(60) NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS permissions (
  id INT AUTO_INCREMENT PRIMARY KEY, role_id INT NOT NULL, resource VARCHAR(60) NOT NULL, action VARCHAR(30) NOT NULL,
  UNIQUE KEY uq_perm (role_id, resource, action), FOREIGN KEY (role_id) REFERENCES roles(id)
);
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY, role_id INT NOT NULL, email VARCHAR(190) NOT NULL UNIQUE,
  display_name VARCHAR(120) NOT NULL, password_hash VARCHAR(255) NOT NULL,
  mfa_secret_enc VARBINARY(255) NULL, mfa_enabled TINYINT(1) NOT NULL DEFAULT 0,
  failed_logins INT NOT NULL DEFAULT 0, locked_until DATETIME NULL, last_login_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (role_id) REFERENCES roles(id)
);
CREATE TABLE IF NOT EXISTS sessions (
  id CHAR(64) PRIMARY KEY, admin_id INT NOT NULL, ip VARCHAR(45), user_agent VARCHAR(255),
  expires_at DATETIME NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (admin_id) REFERENCES admins(id)
);

CREATE TABLE IF NOT EXISTS companies (
  id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(160) NOT NULL, sector VARCHAR(80), created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY, company_id INT NULL, first_name VARCHAR(80) NOT NULL, last_name VARCHAR(80) NOT NULL,
  email VARCHAR(190) NOT NULL, phone VARCHAR(40), company_name VARCHAR(160), job_title VARCHAR(120), sector VARCHAR(80),
  source VARCHAR(40) NOT NULL DEFAULT 'site',
  pipeline_stage ENUM('nouveau','contact','rendez-vous','qualification','proposition','projet','transformation') NOT NULL DEFAULT 'nouveau',
  notes TEXT, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY ix_email (email), FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE IF NOT EXISTS expertises (
  id INT AUTO_INCREMENT PRIMARY KEY, slug VARCHAR(80) NOT NULL UNIQUE, name VARCHAR(80) NOT NULL, line VARCHAR(255) NOT NULL,
  position INT NOT NULL DEFAULT 0, status ENUM('draft','preview','scheduled','published','archived') NOT NULL DEFAULT 'draft'
);
CREATE TABLE IF NOT EXISTS media (
  id INT AUTO_INCREMENT PRIMARY KEY, path VARCHAR(255) NOT NULL, mime VARCHAR(80) NOT NULL, alt_text VARCHAR(255),
  tags VARCHAR(255), folder VARCHAR(120), width INT, height INT, bytes INT, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS transformations (
  id INT AUTO_INCREMENT PRIMARY KEY, slug VARCHAR(120) NOT NULL UNIQUE, project VARCHAR(160) NOT NULL, client VARCHAR(160),
  sector VARCHAR(80), punchline VARCHAR(255), impact_value VARCHAR(40), impact_label VARCHAR(160), cover_media_id INT NULL,
  blocks JSON NULL, status ENUM('draft','preview','scheduled','published','archived') NOT NULL DEFAULT 'draft',
  publish_at DATETIME NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (cover_media_id) REFERENCES media(id)
);
CREATE TABLE IF NOT EXISTS transformation_expertises (
  transformation_id INT NOT NULL, expertise_id INT NOT NULL, PRIMARY KEY (transformation_id, expertise_id),
  FOREIGN KEY (transformation_id) REFERENCES transformations(id) ON DELETE CASCADE, FOREIGN KEY (expertise_id) REFERENCES expertises(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS observatory_categories (
  id INT AUTO_INCREMENT PRIMARY KEY, slug VARCHAR(80) NOT NULL UNIQUE, name VARCHAR(80) NOT NULL
);
CREATE TABLE IF NOT EXISTS observatory_posts (
  id INT AUTO_INCREMENT PRIMARY KEY, category_id INT NULL, slug VARCHAR(120) NOT NULL UNIQUE, title VARCHAR(190) NOT NULL,
  blocks JSON NULL, status ENUM('draft','preview','scheduled','published','archived') NOT NULL DEFAULT 'draft',
  publish_at DATETIME NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (category_id) REFERENCES observatory_categories(id)
);

-- Programme jeunes : données strictement privées, jamais exposées par une API publique.
CREATE TABLE IF NOT EXISTS athletes (
  id INT AUTO_INCREMENT PRIMARY KEY, first_name_enc VARBINARY(255) NOT NULL, last_name_enc VARBINARY(255) NOT NULL,
  birth_year SMALLINT NULL, guardian_contact_enc VARBINARY(512) NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS athlete_results (
  id INT AUTO_INCREMENT PRIMARY KEY, athlete_id INT NOT NULL, competition VARCHAR(190), result VARCHAR(120), happened_on DATE, notes TEXT,
  FOREIGN KEY (athlete_id) REFERENCES athletes(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS athlete_objectives (
  id INT AUTO_INCREMENT PRIMARY KEY, athlete_id INT NOT NULL, title VARCHAR(190), target_date DATE, status VARCHAR(40),
  FOREIGN KEY (athlete_id) REFERENCES athletes(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS athlete_followups (
  id INT AUTO_INCREMENT PRIMARY KEY, athlete_id INT NOT NULL, happened_on DATE NOT NULL, summary TEXT, video_media_id INT NULL,
  FOREIGN KEY (athlete_id) REFERENCES athletes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY, contact_id INT NOT NULL, reason VARCHAR(40) NOT NULL, starts_at DATETIME NOT NULL, duration_min SMALLINT NOT NULL,
  status ENUM('confirmed','cancelled','rescheduled','done') NOT NULL DEFAULT 'confirmed', message TEXT,
  manage_token_hash CHAR(64) NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY ix_starts (starts_at, status), FOREIGN KEY (contact_id) REFERENCES contacts(id)
);
CREATE TABLE IF NOT EXISTS availability (
  id INT AUTO_INCREMENT PRIMARY KEY, weekday TINYINT NOT NULL, start_time TIME NOT NULL, end_time TIME NOT NULL
);
CREATE TABLE IF NOT EXISTS blocked_periods (
  id INT AUTO_INCREMENT PRIMARY KEY, starts_at DATETIME NOT NULL, ends_at DATETIME NOT NULL, label VARCHAR(160), kind ENUM('conge','ferie','indispo','pause') NOT NULL DEFAULT 'indispo',
  KEY ix_range (starts_at, ends_at)
);

CREATE TABLE IF NOT EXISTS email_templates (
  id INT AUTO_INCREMENT PRIMARY KEY, code VARCHAR(80) NOT NULL UNIQUE, subject VARCHAR(190) NOT NULL, html MEDIUMTEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS email_events (
  id INT AUTO_INCREMENT PRIMARY KEY, event VARCHAR(80) NOT NULL, template_code VARCHAR(80) NOT NULL, offset_minutes INT NOT NULL DEFAULT 0, enabled TINYINT(1) NOT NULL DEFAULT 1
);
CREATE TABLE IF NOT EXISTS email_logs (
  id INT AUTO_INCREMENT PRIMARY KEY, appointment_id INT NULL, template VARCHAR(80) NOT NULL, to_email VARCHAR(190) NOT NULL, subject VARCHAR(190) NOT NULL,
  html MEDIUMTEXT NOT NULL, status ENUM('queued','sent','failed') NOT NULL DEFAULT 'queued', error VARCHAR(255) NULL,
  send_after DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, sent_at DATETIME NULL, KEY ix_queue (status, send_after),
  FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY, admin_id INT NULL, kind VARCHAR(60) NOT NULL, payload JSON NULL, read_at DATETIME NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS audit_logs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY, admin_id INT NULL, action VARCHAR(80) NOT NULL, object_type VARCHAR(60), object_id VARCHAR(60),
  result ENUM('success','failure') NOT NULL, ip VARCHAR(45), created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, KEY ix_admin (admin_id, created_at)
);
CREATE TABLE IF NOT EXISTS security_logs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY, event VARCHAR(80) NOT NULL, ip VARCHAR(45), detail VARCHAR(255), created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- D&D Case Intelligence : bibliothèque de cas réels (110 → 300+ sans changement du front-end).
CREATE TABLE IF NOT EXISTS cases (
  id VARCHAR(120) PRIMARY KEY,
  title VARCHAR(190) NOT NULL,
  organization VARCHAR(190) NOT NULL,
  year SMALLINT NOT NULL,
  category ENUM('AUDIT','CONSEILS','STRATÉGIE','CONCEPT CRÉATIF','MARKETING','COMMUNICATION','PERFORMANCE','DESIGN','DÉVELOPPEMENT','SPONSORING','ÉVÉNEMENTIEL') NOT NULL,
  secondary_categories JSON NULL,
  problem VARCHAR(400) NOT NULL,
  solution TEXT NOT NULL,
  impact TEXT NOT NULL,
  dd_lens VARCHAR(300) NOT NULL,
  image VARCHAR(255) NULL,
  source_name VARCHAR(160) NOT NULL,
  source_url VARCHAR(500) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY ix_active_cat (active, category, sort_order)
);
