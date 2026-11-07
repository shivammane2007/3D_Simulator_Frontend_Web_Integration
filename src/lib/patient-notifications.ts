export interface PatientNotification {
  id: string;
  type: string;
  title: string;
  body: string | null;
  actionUrl: string | null;
  actionLabel: string | null;
  readAt: string | null;
  createdAt: string;
}

const STORAGE_KEY = 'faceify_patient_notifications';

export const DEFAULT_NOTIFICATIONS: PatientNotification[] = [
  {
    id: 'notif-1',
    type: 'consultation_confirmed',
    title: 'Virtual Consultation Ready',
    body: 'Your interactive 3D consultation guidelines are ready. Explore procedures before your visit.',
    actionUrl: '/patient/consultation',
    actionLabel: 'Start Consultation',
    readAt: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 mins ago
  },
  {
    id: 'notif-2',
    type: 'simulation_shared_with_you',
    title: '3D Simulation Available',
    body: 'AI mesh fitting for Rhinoplasty and Facial Contouring is ready to simulate in your browser.',
    actionUrl: '/simulate/rhinoplasty',
    actionLabel: 'Try 3D Simulator',
    readAt: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: 'notif-3',
    type: 'welcome',
    title: 'Welcome to Faceify Labs',
    body: 'Your privacy-first personal space is active. No patient photos are stored on public servers.',
    actionUrl: '/patient/dashboard',
    actionLabel: 'View Dashboard',
    readAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago (read)
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

export function getStoredNotifications(): PatientNotification[] {
  if (typeof window === 'undefined') return DEFAULT_NOTIFICATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_NOTIFICATIONS));
      return DEFAULT_NOTIFICATIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_NOTIFICATIONS;
  } catch {
    return DEFAULT_NOTIFICATIONS;
  }
}

export function saveStoredNotifications(notifs: PatientNotification[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifs));
    window.dispatchEvent(new CustomEvent('fl_notifications_changed'));
  } catch {
    // Non-fatal
  }
}

export function markNotificationRead(id: string): PatientNotification[] {
  const current = getStoredNotifications();
  const updated = current.map((n) =>
    n.id === id ? { ...n, readAt: n.readAt || new Date().toISOString() } : n
  );
  saveStoredNotifications(updated);
  return updated;
}

export function markAllNotificationsRead(): PatientNotification[] {
  const current = getStoredNotifications();
  const now = new Date().toISOString();
  const updated = current.map((n) => ({
    ...n,
    readAt: n.readAt || now,
  }));
  saveStoredNotifications(updated);
  return updated;
}

export function deleteNotification(id: string): PatientNotification[] {
  const current = getStoredNotifications();
  const updated = current.filter((n) => n.id !== id);
  saveStoredNotifications(updated);
  return updated;
}

export function formatTimeAgo(isoString: string): string {
  try {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
  } catch {
    return 'Recently';
  }
}

