import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (!token) {
      return NextResponse.json(
        { error: 'Tidak ada sesi aktif.' },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token.value);

    if (!payload) {
      cookieStore.delete('auth_token');
      return NextResponse.json(
        { error: 'Sesi tidak valid atau kedaluwarsa.' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { user: payload },
      { status: 200 }
    );
  } catch (error) {
    console.error('Auth me error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}
