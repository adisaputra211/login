import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { verifyPassword, createToken } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rate-limit';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Talu banyak percobaan login. Silakan tunggu beberapa saat.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Email/Username dan Password wajib diisi!' },
        { status: 400 }
      );
    }

    const isEmail = identifier.includes('@');
    let sql = 'SELECT id, email, username, password_hash FROM users WHERE username = ?';
    if (isEmail) {
      sql = 'SELECT id, email, username, password_hash FROM users WHERE email = ?';
    }

    const [users] = await pool.execute(sql, [identifier]);

    if (users.length === 0) {
      return NextResponse.json(
        { error: 'Email/Username atau Password salah!' },
        { status: 401 }
      );
    }

    const user = users[0];

    const isPasswordValid = await verifyPassword(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Email/Username atau Password salah!' },
        { status: 401 }
      );
    }

    const token = await createToken({ 
      id: user.id, 
      email: user.email, 
      username: user.username 
    });

    const cookieStore = await cookies();
    cookieStore.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json(
      { 
        message: 'Login berhasil!',
        user: { id: user.id, email: user.email, username: user.username }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}
