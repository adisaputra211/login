import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function initDb() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || '3306',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    const dbName = process.env.DB_NAME || 'login_db';

    console.log(`Creating database ${dbName} if not exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.query(`USE \`${dbName}\`;`);

    console.log('Creating users table...');
    await connection.query(`

      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        username VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Seeding demo user...');

    const [rows] = await connection.query('SELECT id FROM users WHERE email = ?', ['admin@example.com']);

    if (rows.length === 0) {
      const demoPasswordHash = await bcrypt.hash('password123', 10);
      await connection.query(
        'INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)',
        ['admin@example.com', 'admin', demoPasswordHash]
      );
      console.log('Demo user created:');
      console.log('- Email/Username: admin@example.com / admin');
      console.log('- Password: password123');
    } else {
      console.log('Demo user already exists. Skipping seed.');
    }

    console.log('Database initialization completed successfully!');
    await connection.end();
    process.exit(0);

  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDb();
