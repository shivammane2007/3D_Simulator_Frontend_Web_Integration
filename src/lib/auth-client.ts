'use client';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'surgeon' | 'platform_admin';
  createdAt?: string;
  dateOfBirth?: string;
  gender?: string;
  country?: string;
  city?: string;
}

export const DEFAULT_PATIENT_USER: UserSession = {
  id: 'usr_patient_default',
  name: 'Shivam Mane',
  email: 'shivammane2007@gmail.com',
  role: 'patient',
  createdAt: 'August 2026',
  dateOfBirth: '',
  gender: '',
  country: 'IN',
  city: 'Mumbai',
};

/**
 * Reads the current authenticated session from storage or cookie
 */
export function getStoredUser(): UserSession | null {
  if (typeof window === 'undefined') return null;

  try {
    const token = localStorage.getItem('fl_auth_token') || sessionStorage.getItem('fl_auth_token');
    const userRaw = localStorage.getItem('fl_user') || sessionStorage.getItem('fl_user');

    if (!token && !document.cookie.includes('fl_auth_token') && !document.cookie.includes('fl-session')) {
      return null;
    }

    if (userRaw) {
      return JSON.parse(userRaw) as UserSession;
    }

    // If token exists but user object is missing, reconstruct default patient user
    return DEFAULT_PATIENT_USER;
  } catch {
    return null;
  }
}

/**
 * Saves or updates user session in storage and cookies
 */
export function persistUserSession(user: Partial<UserSession>): UserSession {
  const existing = getStoredUser() || DEFAULT_PATIENT_USER;
  const updated: UserSession = {
    ...existing,
    ...user,
  };

  const id = updated.id || 'usr_' + Math.random().toString(36).substring(2, 9);
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      id,
      email: updated.email,
      name: updated.name,
      role: updated.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
    })
  );
  const signature = btoa('faceify_session_' + id);
  const jwtToken = `${header}.${payload}.${signature}`;

  try {
    localStorage.setItem('fl_auth_token', jwtToken);
    sessionStorage.setItem('fl_auth_token', jwtToken);
    localStorage.setItem('fl_user', JSON.stringify(updated));
    sessionStorage.setItem('fl_user', JSON.stringify(updated));

    document.cookie = `fl_auth_token=${jwtToken}; path=/; max-age=2592000; SameSite=Lax`;
    document.cookie = `fl-session=${jwtToken}; path=/; max-age=2592000; SameSite=Lax`;

    window.dispatchEvent(new Event('fl_auth_changed'));
  } catch {
    // Non-fatal
  }

  return updated;
}

/**
 * Logs out user and destroys all session tokens and cookies
 */
export function signOutClient(): void {
  try {
    localStorage.removeItem('fl_auth_token');
    sessionStorage.removeItem('fl_auth_token');
    localStorage.removeItem('fl_user');
    sessionStorage.removeItem('fl_user');

    document.cookie = 'fl_auth_token=; path=/; max-age=0; SameSite=Lax';
    document.cookie = 'fl-session=; path=/; max-age=0; SameSite=Lax';

    window.dispatchEvent(new Event('fl_auth_changed'));
  } catch {
    // Non-fatal
  }
}

