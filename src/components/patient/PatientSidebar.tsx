'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Sparkles,
  BookOpen,
  MapPin,
  Calendar,
  Image as ImageIcon,
  Settings
} from 'lucide-react';
import { routes } from '@/config/routes';
import PatientNotificationBell from './PatientNotificationBell';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SIDEBAR_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/patient/dashboard', icon: LayoutDashboard },
  { label: 'My Profile', href: '/patient/profile', icon: User },
  { label: 'Simulate', href: routes.simulate, icon: Sparkles },
  { label: 'Procedure Guides', href: routes.procedures, icon: BookOpen },
  { label: 'Find a Specialist', href: routes.directory, icon: MapPin },
  { label: 'My Consultation', href: '/patient/consultation', icon: Calendar },
  { label: 'My Results', href: '/patient/results', icon: ImageIcon },
  { label: 'Settings', href: '/patient/settings', icon: Settings },
];

export default function PatientSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-black/5 shrink-0 min-h-[calc(100vh-4rem)]">
      {/* Header with Title and Bell */}
      <div className="px-5 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="block w-2 h-2 rounded-full bg-[#CF4500]" />
          <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#141413]">
            Patient Portal
          </p>
        </div>
        
        {/* Notification Bell */}
        <PatientNotificationBell align="sidebar" />
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 space-y-1">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/patient/dashboard' && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[14px] text-xs transition-all ${
                isActive
                  ? 'bg-[#FDEEE7] text-[#CF4500] font-bold border border-[#CF4500]/15 shadow-xs'
                  : 'text-[#555555] font-medium hover:bg-[#F3F0EE] hover:text-[#141413]'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#CF4500]' : 'text-[#696969]'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

