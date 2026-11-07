'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bell,
  CalendarCheck,
  CalendarX,
  CreditCard,
  Clock,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Info,
  X,
  ArrowRight,
  CheckCheck
} from 'lucide-react';
import {
  PatientNotification,
  getStoredNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  formatTimeAgo,
} from '@/lib/patient-notifications';

interface PatientNotificationBellProps {
  align?: 'sidebar' | 'left' | 'right';
  className?: string;
}

function getNotifIcon(type: string) {
  const cls = 'w-4 h-4 shrink-0';
  switch (type) {
    case 'consultation_confirmed':
      return <CalendarCheck className={`${cls} text-[#CF4500]`} />;
    case 'consultation_cancelled':
      return <CalendarX className={`${cls} text-red-600`} />;
    case 'deposit_requested':
      return <CreditCard className={`${cls} text-[#9A6428]`} />;
    case 'deposit_expiring':
      return <Clock className={`${cls} text-[#CF4500]`} />;
    case 'deposit_paid':
      return <CheckCircle2 className={`${cls} text-[#CF4500]`} />;
    case 'simulation_shared_with_you':
    case 'simulation':
      return <Sparkles className={`${cls} text-[#CF4500]`} />;
    case 'surgeon_message':
      return <MessageSquare className={`${cls} text-[#141413]`} />;
    default:
      return <Info className={`${cls} text-[#696969]`} />;
  }
}

export default function PatientNotificationBell({
  align = 'sidebar',
  className = '',
}: PatientNotificationBellProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<PatientNotification[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync notifications from local storage / API
  const refreshNotifications = useCallback(() => {
    const list = getStoredNotifications();
    setNotifications(list);
  }, []);

  useEffect(() => {
    refreshNotifications();
    const handleStorageChange = () => refreshNotifications();
    window.addEventListener('fl_notifications_changed', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('fl_notifications_changed', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [refreshNotifications]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const unreadCount = notifications.filter((n) => !n.readAt).length;

  const handleItemClick = (notif: PatientNotification) => {
    if (!notif.readAt) {
      const updated = markNotificationRead(notif.id);
      setNotifications(updated);
    }
    if (notif.actionUrl) {
      setOpen(false);
      router.push(notif.actionUrl);
    }
  };

  const handleMarkAllRead = () => {
    const updated = markAllNotificationsRead();
    setNotifications(updated);
  };

  const handleClear = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteNotification(id);
    setNotifications(updated);
  };

  // Dropdown alignment styling
  const alignClass =
    align === 'right'
      ? 'right-0'
      : align === 'left'
      ? 'left-0'
      : 'left-0 sm:left-auto sm:right-[-120px] lg:left-0 lg:right-auto';

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Bell Button */}
      <button
        type="button"
        aria-label="Patient notifications"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="relative p-1.5 rounded-lg text-[#696969] hover:text-[#141413] hover:bg-[#F3F0EE] transition-colors cursor-pointer select-none"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span 
            className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#CF4500] ring-2 ring-white animate-pulse" 
            title={`${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`}
          />
        )}
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div
          className={`absolute top-10 ${alignClass} z-50 w-80 sm:w-92 max-w-[calc(100vw-2rem)] bg-white rounded-[24px] border border-black/10 shadow-level-2 overflow-hidden`}
          role="dialog"
          aria-label="Notifications panel"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-black/5 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium tracking-tight text-[#141413]">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FDEEE7] text-[#CF4500]">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#696969] hover:text-[#CF4500] transition-colors cursor-pointer"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Mark all read</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg text-[#696969] hover:text-[#141413] hover:bg-[#F3F0EE] transition-colors cursor-pointer"
                aria-label="Close notifications"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* List Content */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-black/5">
            {notifications.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-[16px] bg-[#F3F0EE] text-[#696969] flex items-center justify-center mb-3">
                  <Bell className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-[#141413]">No notifications yet</p>
                <p className="text-xs text-[#555555] mt-1 max-w-[200px] leading-relaxed">
                  Updates on your consultations and 3D simulations will appear here.
                </p>
              </div>
            ) : (
              notifications.map((notif) => {
                const isUnread = !notif.readAt;
                return (
                  <div
                    key={notif.id}
                    onClick={() => handleItemClick(notif)}
                    className={`p-4 transition-colors cursor-pointer flex items-start gap-3 relative group ${
                      isUnread ? 'bg-[#FDEEE7]/30 hover:bg-[#FDEEE7]/45' : 'bg-white hover:bg-[#F3F0EE]/60'
                    }`}
                  >
                    {/* Icon Container */}
                    <div
                      className={`w-8 h-8 rounded-[12px] flex items-center justify-center shrink-0 mt-0.5 ${
                        isUnread ? 'bg-[#FDEEE7]' : 'bg-[#F3F0EE]'
                      }`}
                    >
                      {getNotifIcon(notif.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`text-xs sm:text-sm leading-snug truncate ${
                            isUnread ? 'font-medium text-[#141413]' : 'font-normal text-[#555555]'
                          }`}
                        >
                          {notif.title}
                        </p>
                        {isUnread && (
                          <span className="w-2 h-2 rounded-full bg-[#CF4500] shrink-0" />
                        )}
                      </div>

                      {notif.body && (
                        <p className="text-xs text-[#555555] mt-1 line-clamp-2 leading-relaxed font-normal">
                          {notif.body}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-2 pt-1">
                        <span className="text-[10px] text-[#696969]">
                          {formatTimeAgo(notif.createdAt)}
                        </span>

                        {notif.actionLabel && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#CF4500] group-hover:translate-x-0.5 transition-transform">
                            <span>{notif.actionLabel}</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Individual Clear Button */}
                    <button
                      type="button"
                      onClick={(e) => handleClear(notif.id, e)}
                      title="Dismiss notification"
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-[#696969] hover:text-[#141413] absolute top-2 right-2 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-2.5 bg-[#FCFBFA] border-t border-black/5 flex items-center justify-between text-[11px] text-[#696969]">
            <span>Faceify Patient Portal</span>
            {notifications.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  notifications.forEach((n) => deleteNotification(n.id));
                  setNotifications([]);
                }}
                className="hover:text-[#CF4500] transition-colors cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

