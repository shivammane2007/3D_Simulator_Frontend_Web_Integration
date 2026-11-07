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
  FileImage,
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
  { label: 'My Results', href: '/patient/results', icon: FileImage },
  { label: 'Settings', href: '/patient/settings', icon: Settings },
];

export default function PatientSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-[#E8E2D8] shrink-0 min-h-[calc(100vh-4rem)]">
      {/* Header with Title and Bell */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="block w-4 h-px bg-[#305A4F]" />
            <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#305A4F]">
              PATIENT PORTAL
            </p>
          </div>
          
          {/* Notification Bell */}
          <PatientNotificationBell />
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 space-y-0.5">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/patient/dashboard' && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#305A4F]/10 text-[#305A4F] font-semibold border border-[#305A4F]/20'
                  : 'text-slate-500 hover:bg-[#EBE7E3]/50 hover:text-[#0A0F1A] border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

