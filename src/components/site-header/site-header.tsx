import React from 'react';
import { cn } from '@/lib/utils';
import Navigator from '@/components//navigation';
import { ModeToggle } from '@/components/theme-provider';

import { HeaderLogo } from '../logo';
import { AuthStatus } from '../auth';

interface SiteHeaderProps {
  useAuth?: boolean;
  useNavigator?: boolean;
  className?: string;
}

const SiteHeader = ({ useAuth = true, useNavigator = true, className }: SiteHeaderProps) => (
  <header
    className={cn(
      'sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60',
      className
    )}
  >
    {useNavigator ? <Navigator /> : <HeaderLogo className="pr-6" />}

    <div className="flex items-center space-x-4">
      <ModeToggle />
      {useAuth && <AuthStatus />}
    </div>
  </header>
);

export default SiteHeader;
