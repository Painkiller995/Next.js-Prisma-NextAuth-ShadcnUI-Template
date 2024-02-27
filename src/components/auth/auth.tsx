'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import Skeleton from '../skeleton';
import { Button } from '../ui/button';

export const LoginButton = () => <Button onClick={() => signIn()}>Login</Button>;

export const LogoutButton = () => <Button onClick={() => signOut()}>Logout</Button>;

export const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return <Skeleton width="2.5rem" height="2.5rem" borderRadius="100%" />;

  if (status === 'unauthenticated')
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button type="button">
          <Avatar>
            <AvatarImage src={session!.user!.image!} />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div>{session!.user!.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
