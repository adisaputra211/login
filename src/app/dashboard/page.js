'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import styles from './page.module.css';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (!response.ok) {
          throw new Error('Sesi tidak valid');
        }
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error(error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed', error);
      setIsLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container} style={{ justifyContent: 'center' }}>
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className={styles.container}>
      <header className={`glass-panel ${styles.header}`}>
        <div className={styles.logo}>MyApp</div>
        <button 
          onClick={handleLogout} 
          className={styles.logoutBtn}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Keluar...' : 'Keluar Sesi'}
        </button>
      </header>

      <main className={styles.content}>
        <div className={`glass-panel ${styles.welcomeCard}`}>
          <h1 className={styles.greeting}>
            Welcome, <span>{user.username}</span>!
          </h1>
          <p className={styles.info}>
            Anda telah berhasil masuk. Ini adalah halaman dashboard yang terlindungi.
          </p>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statTitle}>Email User</div>
              <div className={styles.statValue}>{user.email}</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statTitle}>Status Sesi</div>
              <div className={styles.statValue} style={{ color: '#10b981' }}>Aktif</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statTitle}>Hak Akses</div>
              <div className={styles.statValue}>User Biasa</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
