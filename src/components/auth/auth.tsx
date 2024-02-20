'use client';

import { signIn, signOut } from 'next-auth/react';

import { Button } from '../ui/button';

export const LoginButton = () => <Button onClick={() => signIn()}>Login</Button>;

export const LogoutButton = () => <Button onClick={() => signOut()}>Logout</Button>;
