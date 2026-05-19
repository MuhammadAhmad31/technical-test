export const schemaSql = [
  `CREATE TABLE users (
    id TEXT PRIMARY KEY,
    nama TEXT NOT NULL,
    email TEXT,
    telp TEXT
  );`,
  `CREATE TABLE companies (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    company_code TEXT NOT NULL,
    company_name TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );`
];

export const seedSql = [
  `INSERT INTO users (id, nama, email, telp) VALUES
    ('12qwer', 'Imron', NULL, '081234567890'),
    ('321rewq', 'Juli', 'Sammy@mail.com', '0987654321');`,
  `INSERT INTO companies (id, user_id, company_code, company_name) VALUES
    ('trew098', '12qwer', 'SPI', NULL),
    ('poiuyt1234', '321rewq', 'PIC', 'Samudera');`
];

export const querySql = `SELECT
  u.id AS user_id,
  c.id AS company_id,
  u.nama,
  u.email,
  u.telp,
  c.company_code,
  c.company_name
FROM users u
JOIN companies c ON c.user_id = u.id;`;
