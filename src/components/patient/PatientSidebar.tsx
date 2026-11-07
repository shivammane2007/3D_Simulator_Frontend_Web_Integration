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
  Settings,
  Bell
} from 'lucide-react';
import { routes } from '@/config/routes';

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
    <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-slate-200/90 shrink-0 min-h-[calc(100vh-4rem)]">
      {/* Header with Title and Bell */}
      <div className="px-5 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="block w-3.5 h-[1.5px] bg-[#2D5548]" />
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#2D5548]">
            Patient Portal
          </p>
        </div>
        
        {/* Notification Bell */}
        <button 
          type="button"
          aria-label="Patient notifications" 
          className="relative p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#CF4500]" />
        </button>
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
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#EBF3EF] text-[#2D5548] font-bold border border-[#2D5548]/15 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100/70 hover:text-ink'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#2D5548]' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

