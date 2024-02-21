'use client';

import { z } from 'zod';
import axios from 'axios';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signOut } from 'next-auth/react';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AlertDestructive from '@/components/alert';
import { resetPasswordSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormItem, FormField, FormControl, FormMessage } from '@/components/ui/form';

interface ResetPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm({ className, ...props }: ResetPasswordFormProps) {
  const router = useRouter();

  const [error, setError] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);

      // Sign out any existing sessions before signing in
      await signOut({
        redirect: false,
      });

      const signInResult = await axios.post('/api/auth/reset-password', data);
      if (signInResult.status === 201) {
        router.push('/login');
        router.refresh();
      }
    } catch (e: AxiosError) {
      if (e.response?.data?.error) {
        setError(e.response.data.error);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      setIsSubmitting(false);
    }
  });

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <AlertDestructive alertDescription={error} />
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="mt-2 text-white" disabled={isSubmitting}>
              {isSubmitting && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
              Reset Password🌟
            </Button>
          </div>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </div>
  );
}
