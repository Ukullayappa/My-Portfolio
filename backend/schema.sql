-- Run this SQL in your PostgreSQL database to create required tables
-- Command: psql -U postgres -d portfolio_db -f schema.sql

-- Create database (run separately if not created)
-- CREATE DATABASE portfolio_db;

-- ─── Contact Messages Table ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  email       VARCHAR(150)  NOT NULL,
  subject     VARCHAR(200),
  message     TEXT          NOT NULL,
  is_read     BOOLEAN       DEFAULT FALSE,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ─── Projects Table (for future use) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id            SERIAL PRIMARY KEY,
  title         VARCHAR(200)  NOT NULL,
  description   TEXT,
  tags          TEXT[],          -- e.g. ARRAY['React', 'Node.js', 'PostgreSQL']
  github_url    VARCHAR(500),
  live_url      VARCHAR(500),
  emoji         VARCHAR(10)   DEFAULT '🚀',
  color         VARCHAR(20)   DEFAULT '#2563a8',
  is_featured   BOOLEAN       DEFAULT TRUE,
  display_order INT           DEFAULT 0,
  created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ─── Skills Table (for future dynamic management) ─────────────────────────────
CREATE TABLE IF NOT EXISTS skills (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  category    VARCHAR(50),   -- 'frontend' | 'backend' | 'tools'
  level       INT CHECK (level BETWEEN 0 AND 100),
  icon_name   VARCHAR(50),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── Indexes ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);

-- ─── Sample skill data (matches the portfolio) ────────────────────────────────
INSERT INTO skills (name, category, level, icon_name) VALUES
  ('HTML5',      'frontend', 85, 'FaHtml5'),
  ('CSS3',       'frontend', 80, 'FaCss3Alt'),
  ('JavaScript', 'frontend', 75, 'FaJs'),
  ('React',      'frontend', 70, 'FaReact'),
  ('Bootstrap',  'frontend', 80, 'SiBootstrap'),
  ('Vite',       'frontend', 65, 'SiVite'),
  ('Node.js',    'backend',  70, 'FaNodeJs'),
  ('Express.js', 'backend',  68, 'SiExpress'),
  ('PostgreSQL', 'backend',  65, 'SiPostgresql'),
  ('REST APIs',  'backend',  70, 'FaDatabase'),
  ('Git',        'tools',    72, 'FaGitAlt')
ON CONFLICT DO NOTHING;

SELECT 'Schema setup complete! ✅' AS status;
